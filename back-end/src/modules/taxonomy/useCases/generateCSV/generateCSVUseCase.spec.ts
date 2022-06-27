import csvParser from 'csv-parser';
import fs from 'fs';
import getStream from 'get-stream';

import { WfoRepositoryInMemory } from '../../../wfo/repositories/in-memory/WfoRepositoryInMemory';
import { TaxonomiesRepositoryInMemory } from '../../repositories/in-memory/TaxonomiesRepositoryInMemory';
import { GetTaxonomyByNameUseCase } from '../getTaxonomy/getTaxonomyByNameUseCase';

let wfoRepositoryInMemory: WfoRepositoryInMemory;
let taxonomiesRepositoryInMemory: TaxonomiesRepositoryInMemory;
let getTaxonomyByNameUseCase: GetTaxonomyByNameUseCase;

describe('Generate out CSV of Taxonomies', () => {
    beforeEach(() => {
        wfoRepositoryInMemory = new WfoRepositoryInMemory();
        taxonomiesRepositoryInMemory = new TaxonomiesRepositoryInMemory(
            wfoRepositoryInMemory,
        );
    });

    it('should generate the CSV', async () => {
        const headers =
            'Nome pesquisado,' +
            'Nome retornado,' +
            'Nome aceito/sinonimo,' +
            'Sinônimo de,' +
            'Base de dados(FDB/TPL(WFO)),' +
            'Família respectiva da base de dados\n';

        const fileId = 'teste';
        const outputFilePath = `./tmp/${fileId}.csv`;
        fs.writeFile(outputFilePath, headers, (err) => {
            if (err) {
                console.log(err);
            }
        });

        expect(fs.existsSync(outputFilePath)).toBeTruthy();
    });
    it('should generate the CSV with proper headers', async () => {
        const parser = '';
        const headers =
            'Nome pesquisado,' +
            'Nome retornado,' +
            'Nome aceito/sinonimo,' +
            'Sinônimo de,' +
            'Base de dados(FDB/TPL(WFO)),' +
            'Família respectiva da base de dados\n';

        const fileId = 'teste';
        const outputFilePath = `./tmp/${fileId}.csv`;
        fs.writeFile(outputFilePath, headers, (err) => {
            if (err) {
                console.log(err);
            }
        });

        const data = await getStream.array(
            fs.createReadStream(outputFilePath).pipe(csvParser([parser])),
        );
        await data.reduce((line) => {
            return line;
        });
        expect(data[0]).toEqual({
            '': 'Nome pesquisado',
            _1: 'Nome retornado',
            _2: 'Nome aceito/sinonimo',
            _3: 'Sinônimo de',
            _4: 'Base de dados(FDB/TPL(WFO))',
            _5: 'Família respectiva da base de dados',
        });
    });
});
