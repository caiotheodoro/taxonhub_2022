import { EDataset } from './enumerators/types';

class TaxonomyModel {
    constructor(
        public searchedName: string,
        public returnedName: string,
        public acceptedNameOrSynonym: string,
        public synonymOf: string,
        public dataset: EDataset,
        public respectiveFamily: string,
    ) {}
}

export { TaxonomyModel };
