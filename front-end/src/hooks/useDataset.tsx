import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { useToast } from "@chakra-ui/react";
export interface IUseDataset {
  file?: string | Blob;
  setFile: (file: File) => void;
  loading: boolean;
  getData: (token: string, model: string) => Promise<void>;
  step: number;
  setStep: (step: number) => void;
  dataset: DatasetListProps;
}


const DatasetContext = createContext<IUseDataset>(null as any);

interface IProviderProps {
  children: ReactNode;
}

export enum EDataset {
    WFO = 'WFO',
    GBIF = 'GBIF',
  }
  
  
export interface DatasetProps {
    searchedName: string;
    returnedName: string;
    acceptedNameOrSynonym: string;
    synonymOf?: string;
    dataset: EDataset;
    respectiveFamily: string;
    country?: string;
    year?: string;
    month?: string;
    day?: string;
    latitude?: string;
    longitude?: string;
  }

  export interface DatasetListProps {
    model?: string;
    dataset: DatasetProps[];
  }

  

 
  
  

export function DatasetProvider({ children }: IProviderProps) {
  const [file, setFile] = useState<string | Blob>('');
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<DatasetListProps>({dataset: []});
  const toast = useToast();

  const getData = async (token: string, model: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/import", formData, {
      params: {
        userId: token,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (data.data.correct) {
      toast(
        {
          title: "Sucesso!",
          description: "Busca sendo realizada...",
          status: "success",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        },
      )
      
      const {data } = await api.get(`/${model}/generatecsv`, {
        params: {
          userId: token,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        setStep(4);
        return res;
      })

       setLoading(false);

      //store data csv in array
        const csv = data
        //8 position array of csv


        // const csvArray = new Array(15).fill(0).map(
        //   (_, i) => csv.split("\n")[i + 1] && csv.split("\n")[i + 1].split(",")
        // );
        
        const csvArray = csv.split("\n").map(
          (_: any, i: number) => csv.split("\n")[i + 1] && csv.split("\n")[i + 1].split(",")
        );
        //clear undefined values of csvArray
         

       setDataset({dataset: csvArray.filter((item: string) => item !== undefined && item !== '').map((row: any[], index: any) => {
        if(model === 'occurrency'){
          return {
            searchedName: row[0],
            returnedName: row[1],
            acceptedNameOrSynonym: row[2],
            dataset: row[3] === "WFO" ? EDataset.WFO : EDataset.GBIF,
            respectiveFamily: row[4],
            country: row[5],
            year: row[6],
            month: row[7],
            day: row[8],
            latitude: row[9],
            longitude: row[10],
          }
        }
        else {
          return {
            searchedName: row[0],
            returnedName: row[1],
            acceptedNameOrSynonym: row[2],
            synonymOf: row[3],
            dataset: row[4] === "WFO" ? EDataset.WFO : EDataset.GBIF,
            respectiveFamily: row[5],
          }
        }
      })})

        
       
    }
    else {
      setLoading(false);
      toast(
        {
          title: "Erro!",
          description: "O Formato do arquivo não é válido. Cheque o formato padrão e tente novamente.",
          status: "error",
          duration: 12000,
          position: "top-right",
          isClosable: true,
        },
      )
    }


  }

  return (
    <DatasetContext.Provider
      value={{
        file,
        setFile,
        loading,
        getData,
        step,
        setStep,
        dataset
      }
      }
    >
      {children}
    </DatasetContext.Provider>
  ) as React.ReactElement;
}

export function useDataset() {
  const context = useContext(DatasetContext);

  return context;
}


