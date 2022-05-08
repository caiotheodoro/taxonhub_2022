import { parse } from 'csv-parse';
import fs from 'fs';

import { ITaxonomyRepository } from '../../repositories/ITaxonomyRepository';

interface IImportCSV {
    // dados arquivo csv
    name1: string;
    name2: string;
}
class ImportLocalCSVUseCase {
    constructor(private taxonomiesRepository: ITaxonomyRepository) {}

    async execute(file: Express.Multer.File): Promise<IImportCSV[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const taxonomies: IImportCSV[] = [];
            const parseFile = parse();

            stream.pipe(parseFile);
            parseFile
                .on('data', async (line) => {
                    const [name1,name2] = line;
                    taxonomies.push({
                        name1,
                        name2
                    });
                })
                .on('end', () => {
                    fs.promises.unlink(file.path); // a fazer - deletar arquivo apenas quando requisitar a listagem
                    resolve(taxonomies);
                    return taxonomies;

                })
                .on('error', (err) => {
                    reject(err);
                    return [];
                });
        });

    }
}

export { ImportLocalCSVUseCase };
