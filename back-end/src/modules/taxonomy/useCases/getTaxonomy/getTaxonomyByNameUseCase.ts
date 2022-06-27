import puppeteer from 'puppeteer';
import { TaxonomyException } from 'src/modules/exception/TaxonomyException';
import { DefaultResponse } from 'src/modules/http/defaultResponse';
import { EHttpStatuses } from 'src/modules/http/httpStatus';
import { EDataset, ETaxonomyName } from 'src/modules/model/enumerators/types';
import { TaxonomyModel } from 'src/modules/model/Taxonomy';

import { TaxonomyRepository } from '../../repositories/implementations/TaxonomyRepository';

interface IFetchData {
    name: string;
    status: string;
    synonymOf: string;
}

enum ENameType {
    accepted = 'accepted',
    synonym = 'synonym',
    unresolved = 'unresolved',
}

class GetTaxonomyByNameUseCase {
    private readonly nameDataStatusStringPosition = 2;
    private readonly acceptedNameFromSynonymPosition = 3;
    private readonly nameDataStatusPosition = 2;
    private readonly namePosition = 0;
    private readonly arrayStatusPosition = 1;
    private readonly puppeteerTimeoutLimit = 180000;

    constructor(private taxonomyRepository: TaxonomyRepository) {}

    private divideIntoChunks(items: string[], size: number) {
        if (items === null || items.length === 0) return [];

        const chunks = [];
        const its = [].concat(...items);

        while (its.length) {
            chunks.push(its.splice(0, size));
        }

        return chunks;
    }

    private async fetchData(link: string): Promise<IFetchData[]> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(link, { timeout: this.puppeteerTimeoutLimit });

        const searchedNameData = await page.$$eval('h1 span', (spans) =>
            spans
                .map((span) => {
                    return span.textContent.replace(/\n/g, '');
                })
                .filter((e) => e),
        );

        const acceptedName = searchedNameData[this.namePosition];

        const nameStatus =
            searchedNameData[this.nameDataStatusStringPosition].split(' ')[
                this.nameDataStatusPosition
            ];

        if (nameStatus === ENameType.unresolved) {
            const cleanData: IFetchData[] = [];

            cleanData.push({
                name: acceptedName,
                status: nameStatus,
                synonymOf: null,
            });

            return cleanData;
        }

        if (nameStatus === ENameType.synonym) {
            const acceptedNameFromSynonym =
                searchedNameData[this.acceptedNameFromSynonymPosition];
            const cleanData: IFetchData[] = [];

            cleanData.push({
                name: acceptedName,
                status: nameStatus,
                synonymOf: acceptedNameFromSynonym,
            });

            return cleanData;
        }

        const synonyms = await page.evaluate(() => {
            const tds = Array.from(document.querySelectorAll('table tr td'));
            return tds.map((td) => td.textContent).filter((e) => e);
        });

        await browser.close();

        const chunks = this.divideIntoChunks(synonyms, 4);

        const cleanData = chunks.map((row) => {
            return {
                name: row[this.namePosition],
                status: row[this.arrayStatusPosition],
                synonymOf: acceptedName,
            };
        });

        cleanData.unshift({
            name: acceptedName,
            status: nameStatus,
            synonymOf: '',
        });

        return cleanData;
    }

    private convertStatusToPTBR(status: string): string {
        switch (status.toLocaleLowerCase()) {
            case 'accepted':
                return ETaxonomyName.ACCEPTED;
            case 'synonym':
                return ETaxonomyName.SYNONYM;
            case 'unresolved':
                return ETaxonomyName.UNRESOLVED;
            default:
                throw new Error(`Unknown status: ${status}`);
        }
    }

    async execute(scientificName: string): Promise<TaxonomyModel[]> {
        try {
            const returnedData = await this.taxonomyRepository.getRecordByName(
                scientificName,
            );

            if (returnedData === undefined || returnedData === null) {
                throw new TaxonomyException(
                    EHttpStatuses.BAD_REQUEST,
                    `Specie with name ${scientificName} was not found.`,
                );
            }

            const fetchedData = await this.fetchData(returnedData.tplId);

            const taxonomies: TaxonomyModel[] = [];

            const firtInstance = new TaxonomyModel(
                scientificName,
                fetchedData[0].name,
                this.convertStatusToPTBR(fetchedData[0].status),
                fetchedData[0].synonymOf,
                EDataset.WFO,
                returnedData.family,
            );

            taxonomies.push(firtInstance);
            fetchedData.shift();

            fetchedData.forEach((taxonomy) => {
                const searchedName = scientificName;
                const returnedName = taxonomy.name;
                const acceptedNameOrSynonym = taxonomy.status;
                const synonymName = taxonomy.synonymOf;
                const dataset = EDataset.WFO;
                const respectiveFamily = returnedData.family;

                const newTaxonomyData = new TaxonomyModel(
                    searchedName,
                    returnedName,
                    this.convertStatusToPTBR(acceptedNameOrSynonym),
                    synonymName,
                    dataset,
                    respectiveFamily,
                );

                taxonomies.push(newTaxonomyData);
            });

            return taxonomies;
        } catch (e: unknown) {
            if (e instanceof TaxonomyException) {
                const unfoundData: TaxonomyModel[] = [];

                const instance = new TaxonomyModel(
                    scientificName,
                    e.message,
                    '',
                    '',
                    EDataset.WFO,
                    '',
                );

                unfoundData.push(instance);

                return unfoundData;
            }
            throw new Error('an unknown error occurred.');
        }
    }

    async executeResponse(
        scientificName: string,
    ): Promise<DefaultResponse<unknown>> {
        try {
            const response = await this.execute(scientificName);

            return new DefaultResponse<TaxonomyModel[]>(
                EHttpStatuses.SUCCESS,
                response,
            );
        } catch (e: unknown) {
            if (e instanceof TaxonomyException) {
                return new DefaultResponse<string>(e.status, e.message);
            }
            if (e instanceof Error) {
                return new DefaultResponse<string>(
                    EHttpStatuses.INTERNAL_SERVER_ERROR,
                    e.message,
                );
            }
            return new DefaultResponse<string>(
                EHttpStatuses.INTERNAL_SERVER_ERROR,
                'An unknown error occurred.',
            );
        }
    }
}

export { GetTaxonomyByNameUseCase };
