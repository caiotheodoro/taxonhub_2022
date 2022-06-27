import { meta } from "@prisma/client";
import { IRecord } from "src/modules/model/WFORecord";
import { IWfoRepository } from "../IWfoRepository";

class WfoRepositoryInMemory implements IWfoRepository {


    dados: IRecord[] = [{
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

    version: string = "v.2022.04"; 
    status: string = "valid";
    consistencyStatus: string = 'true';
    getSavedVersion(): Promise<string> {
      
        return Promise.resolve(this.version);
    }
    updateVersion(version: string): Promise<void> {
        this.version = version;
        return;
    }
    getRecord(taxonID: string): Promise<IRecord> {
        let record = this.dados.find(
            (record) => record.taxonID === taxonID
        );
        return Promise.resolve(record);
    }
    getRecordByName(scientificName: string): Promise<IRecord> {
        const record = this.dados.find(
            (taxonomy) => taxonomy.scientificName === scientificName,
        );
        return Promise.resolve(record);
    }
    getRecordsByName(scientificName: string): Promise<IRecord[]> {
        let records = this.dados.filter(
            (record) => record.scientificName === scientificName
        );
        return Promise.resolve(records);
    }
    saveRecord(data: IRecord): Promise<void> {
        this.dados.push(data);
        return Promise.resolve();
    }
    updateRecord(data: IRecord): Promise<void> {
        if (data) {
            let index = this.dados.findIndex(
                (record) => record.taxonID === data.taxonID
            );
            this.dados[index] = data;

        }
        return Promise.resolve();
    }
    dropRecordTable(): Promise<void> {
        let records = [];
        this.dados = records;
        return Promise.resolve();
    }
    updateDatabasePhaseStatus(status: string): Promise<void> {
        this.status = status;
        return Promise.resolve();
    }
    updateDatabaseConsistencyStatus(status: string): Promise<void> {
        this.consistencyStatus = status;
        return Promise.resolve();
    }
    getDatabaseConsistencyStatus(): Promise<meta> {
        return Promise.resolve({
            key: "consistencyStatus",
            value: this.consistencyStatus,
        });
    }
    getDatabaseUpdateStatus(): Promise<meta> {
        return Promise.resolve({
            key: "status",
            value: this.status,
        });
    }
    getManyRecordsByName() {
        return;
    }
    saveVersion(){
        return;
    }
    updateMeta(){
        return;
    }
    saveMeta(){
        return;
    }



}

export { WfoRepositoryInMemory };