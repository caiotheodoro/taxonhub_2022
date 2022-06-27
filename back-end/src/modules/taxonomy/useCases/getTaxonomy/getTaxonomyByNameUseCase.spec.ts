import { WfoRepositoryInMemory } from "../../../wfo/repositories/in-memory/WfoRepositoryInMemory";
import { TaxonomiesRepositoryInMemory } from "../../repositories/in-memory/TaxonomiesRepositoryInMemory";

let wfoRepositoryInMemory: WfoRepositoryInMemory
let taxonomiesRepositoryInMemory: TaxonomiesRepositoryInMemory;

describe('Generate out CSV of Taxonomies', () => {
    beforeEach(() => {
        wfoRepositoryInMemory = new WfoRepositoryInMemory();
        taxonomiesRepositoryInMemory = new TaxonomiesRepositoryInMemory(wfoRepositoryInMemory);
    })

    it('should get the taxonomy by name', async () => {

        const taxonomies = await taxonomiesRepositoryInMemory.getRecordByName('Araucária');
        expect(taxonomies.scientificName).toBe('Araucária');
    })
    it('should not get taxonomy when not founded', async () => {

        const taxonomies = await taxonomiesRepositoryInMemory.getRecordByName('Foo');

        expect(taxonomies).toBeUndefined();
    })
    
})