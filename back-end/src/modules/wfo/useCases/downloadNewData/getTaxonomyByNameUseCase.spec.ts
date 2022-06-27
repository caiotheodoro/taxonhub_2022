import { WfoRepositoryInMemory } from "../../repositories/in-memory/WfoRepositoryInMemory";

let wfoRepositoryInMemory: WfoRepositoryInMemory

describe('Generate out CSV of Taxonomies', () => {
    beforeEach(() => {
        wfoRepositoryInMemory = new WfoRepositoryInMemory();
    })

    it('should get the wfo record by name', async () => {

        const wfo = await wfoRepositoryInMemory.getRecordByName('Araucária');
        expect(wfo.scientificName).toBe('Araucária');
    })
    it('should not get wfo record when not founded', async () => {

        const wfo = await wfoRepositoryInMemory.getRecordByName('Foo');

        expect(wfo).toBeUndefined();
    })
    it("should get saved version of wfo record", async () => {
        const version = await wfoRepositoryInMemory.getSavedVersion();
        expect(version).toBe('v.2022.04');
    })
    it("should update the saved version of wfo record", async () => {
        await wfoRepositoryInMemory.updateVersion('v.2022.05');
        const version = await wfoRepositoryInMemory.getSavedVersion();
        expect(version).toBe('v.2022.05');
    })
    it("should get record by taxonId", async () => {
        const record = await wfoRepositoryInMemory.getRecord('1');
        expect(record.taxonID).toBe('1');
    })
    it("should get records by scientific name", async () => {
        const records = await wfoRepositoryInMemory.getRecordsByName('Araucária');
        expect(records.length).toBe(1);
    })
    it("should save record", async () => {
        const record = {
            taxonID: '3',
            scientificNameID: '3',
            scientificName: 'Araucária',
            taxonRank: 'Família',
        }
        await wfoRepositoryInMemory.saveRecord(record);
        const records = await wfoRepositoryInMemory.getRecordsByName('Araucária');
        expect(records.length).toBe(2);
    })
    it("should update record", async () => {
        const record = {
            taxonID: '1',
            scientificNameID: '1',
            scientificName: 'Teste',
            taxonRank: 'Família',
        }
        await wfoRepositoryInMemory.updateRecord(record);
        const records = await wfoRepositoryInMemory.getRecordsByName('Teste');
        expect(records.length).toBe(1);
    })
    it("shoukd drop records", async () => {
        await wfoRepositoryInMemory.dropRecordTable();
        const records = await wfoRepositoryInMemory.getRecordsByName('Teste');
        expect(records.length).toBe(0);
    })
    it("shoukd update database phase status", async () => {
        await wfoRepositoryInMemory.updateDatabasePhaseStatus('phase1');
        const status = await wfoRepositoryInMemory.getDatabaseUpdateStatus();
        expect(status.value).toBe('phase1');
    })
    it("should update database consistency status", async () => {
        await wfoRepositoryInMemory.updateDatabaseConsistencyStatus('consistent');
        const status = await wfoRepositoryInMemory.getDatabaseConsistencyStatus();
        expect(status.value).toBe('consistent');
    })
    it("should not getManyRecordsByName, saveVersion, updateMeta or saveMeta without context", async () => {


        expect(wfoRepositoryInMemory.getManyRecordsByName()).toBeUndefined();
        expect(wfoRepositoryInMemory.saveVersion()).toBeUndefined();
        expect(wfoRepositoryInMemory.updateMeta()).toBeUndefined();
        expect(wfoRepositoryInMemory.saveMeta()).toBeUndefined();

    })


})