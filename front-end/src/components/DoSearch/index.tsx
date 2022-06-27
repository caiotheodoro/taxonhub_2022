import { Flex, Spinner } from "@chakra-ui/react";
import { useDataset } from "../../hooks/useDataset";
import { CustomButton } from "../CustomButton";

interface IDoSearchProps {
  token: string;
  model: string;
}

export function DoSearch({ token, model }: IDoSearchProps) {
    const { loading, getData} = useDataset();
    return (
        <Flex align="center">
          <CustomButton onClick={() => getData(token, model)} >{!loading ? 'Realizar busca' : 'Realizando busca...'}</CustomButton>
          {loading && <Spinner size="md" ml="5" />}
        </Flex>
    )
}

