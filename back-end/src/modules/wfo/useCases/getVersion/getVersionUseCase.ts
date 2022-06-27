import puppeteer from 'puppeteer';
import { DefaultResponse } from 'src/modules/http/defaultResponse';
import { EHttpStatuses } from 'src/modules/http/httpStatus';

import { WfoRepository } from '../../repositories/implementations/WfoRepository';
import { IVersionData } from './types';

class GetVersionUseCase {
    private readonly versionValuePositionOnPage = 3;
    private readonly puppeteerTimeoutLimit = 30000;

    constructor(private wfoRepository: WfoRepository) {}

    private async getVersionFromWebsite(websiteURL: string): Promise<string> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(websiteURL, {
            timeout: this.puppeteerTimeoutLimit,
        });

        const fetchedData = await page.$$eval('table thead tr td', (tds) =>
            tds.map((td) => {
                return td.textContent;
            }),
        );

        const version = fetchedData[this.versionValuePositionOnPage];

        await browser.close();

        return version;
    }

    private compareVersion(
        scrappedVersion: string,
        savedVersion: string,
    ): boolean {
        return scrappedVersion === savedVersion;
    }

    async execute(): Promise<IVersionData> {
        try {
            const versionFromWebsite = await this.getVersionFromWebsite(
                'http://www.worldfloraonline.org/downloadData',
            );

            const savedVersion = await this.wfoRepository.getSavedVersion();

            const isUpdated = this.compareVersion(
                versionFromWebsite,
                savedVersion,
            );

            const response: IVersionData = {
                versionFromWebsite,
                savedVersion,
                isUpdated,
            };

            return response;
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
        }
        return null;
    }

    async executeResponse(): Promise<DefaultResponse<unknown>> {
        try {
            const response: IVersionData = await this.execute();

            if (response === null) {
                throw new Error('An unknown error occurred.');
            }

            return new DefaultResponse<IVersionData>(
                EHttpStatuses.SUCCESS,
                response,
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                return new DefaultResponse<string>(
                    EHttpStatuses.INTERNAL_SERVER_ERROR,
                    e.message,
                );
            }
        }
        return new DefaultResponse<string>(
            EHttpStatuses.INTERNAL_SERVER_ERROR,
            'An unknown error occurred.',
        );
    }
}

export { GetVersionUseCase };
