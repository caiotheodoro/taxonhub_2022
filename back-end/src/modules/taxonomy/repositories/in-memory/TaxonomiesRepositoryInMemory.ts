import { IRecord } from "src/modules/model/WFORecord";
import { WfoRepositoryInMemory } from "src/modules/wfo/repositories/in-memory/WfoRepositoryInMemory";
import { ITaxonomyRepository } from "../ITaxonomyRepository";

class TaxonomiesRepositoryInMemory implements ITaxonomyRepository {
    constructor(private wfoRepositoryInMemory: WfoRepositoryInMemory) { }

    taxonomies: IRecord[] = [{
        taxonID: "1",
        scientificNameID: "1",
        scientificName: "Araucária",
        taxonRank: "Família",


    },
    {
        taxonID: "2",
        scientificNameID: "2",
        scientificName: "Curuba",
        taxonRank: "Família",
    }
    ];

    async getRecordByName(scientificName: string): Promise<IRecord> {
        const record = this.taxonomies.find(
            (taxonomy) => taxonomy.scientificName === scientificName,
        );
        return Promise.resolve(record);
    }

}

export { TaxonomiesRepositoryInMemory };