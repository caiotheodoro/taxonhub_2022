
import { TaxonomyModel } from 'src/modules/model/Taxonomy';
import { ITaxonomyRepository } from '../../repositories/ITaxonomyRepository';
import { IImportCSV } from '../importLocalCSV/importLocalCSVUseCase';


class DoSearchUseCase {
    constructor(private taxonomiesRepository: ITaxonomyRepository) { }

    async execute(data: IImportCSV[]): Promise<TaxonomyModel[]> {

        return new Promise((resolve, reject) => {
            const taxonomies = [];
            data.forEach(async (line) => {
                taxonomies.push(
                    await this.taxonomiesRepository.getRecordByName(line.name1),
                    await this.taxonomiesRepository.getRecordByName(line.name2)
                );
            }
            );
            resolve(taxonomies);
        });
    }

}

export { DoSearchUseCase };
