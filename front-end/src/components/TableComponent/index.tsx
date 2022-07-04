import {
  Box,
  Flex,
  Td,
  Table,
  Tbody,
  Thead,
  Th,
  Tr,
  useBreakpointValue,
  Text,
  Input,
} from "@chakra-ui/react";
import { Pagination } from "../Pagination/index";
import { useEffect, useState } from "react";

let columns = [
  ['Sinônimo de','Familia respectiva'],
  ['Familia','País', 'Ano', 'Mês', 'Dia', 'Lat', 'Long']
];


import { DatasetListProps, DatasetProps, useDataset } from "../../hooks/useDataset";

export function TableComponent({ model, ...rest }: DatasetListProps) {
  const { dataset } = useDataset()
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<DatasetProps[]>([]);
  useEffect(() => {
    let newItems = dataset.dataset.slice((page - 1) * 3, page * 3);
    setItems(newItems);
  }, [page, dataset.dataset]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });




  return (
    <Box {...rest}  >
      <Flex w="100%" maxW={1480} mx="auto" px="6" mb="10">
        <Box flex="1" borderRadius={8} bg="green.light" p="6">
          <Flex mb="8" justify="space-between" align="center">
            <Text px={["4", "4", "6"]} fontSize="lg" fontWeight="medium" color="gray.900">
              Tabela dos resultados
            </Text>
            <Box>
              Escolher pagina
            <Input
                w={100}
                ml="2"
                size="sm"
                variant={"filled"}
                type="number"
                value={page}
                onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if(page > 0 && page != NaN) {
                    setPage(page);
                    }
                }}
            />

            </Box>
          </Flex>
          <>
            <Table colorScheme="blackAlpha" size={"sm"} sx={{
              width: "500px",
              overflowX: "auto",
            }}  >
              <Thead>
                <Tr >
                  <Th px={["4", "4", "6"]} color="gray.900" w="8">
                    Base
                  </Th>
                  <Th color="gray.primary">Nome buscado</Th>
                  <Th color="gray.primary">Nome retornado</Th>
                  {isWideVersion && <Th color="gray.primary">Nome aceito/sinônimo</Th>}
                  {columns[model !== 'occurrency' ? 0 : 1].map((column, index) => {
                    return (
                      <Th color="gray.primary">{column}</Th>
                    )
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {items.map((item, index) => (
                  <Tr key={index}>
                    <Td px={["4", "4", "6"]} fontWeight={"bold"} fontSize={"10px"}>
                      {item.dataset}
                    </Td>
                    <Td color={"gray.dark"} maxW={170}>
                      {item.searchedName}
                    </Td>
                    <Td color={"gray.dark"} maxW={170}>
                      {item.returnedName}
                    </Td>
                    {isWideVersion && <Td color={"gray.dark"} maxW={170}>
                      {item.acceptedNameOrSynonym}
                    </Td>}
                    {isWideVersion && model === 'taxonomy' && <Td color={"gray.dark"} maxW={170}>
                      {item.synonymOf}
                    </Td>}
                    {isWideVersion && <Td color={"gray.dark"} maxW={170}>
                      {item.respectiveFamily}
                    </Td>}
                    {isWideVersion && model === 'occurrency' && <Td color={"gray.dark"} maxW={170}>
                      {item.country}
                    </Td>}
                   {isWideVersion && model === 'occurrency' &&  <Td color={"gray.dark"} maxW={170}>
                      {item.year}
                    </Td>}
                    { isWideVersion && model === 'occurrency' && <Td color={"gray.dark"} maxW={170}>
                      {item.month}
                    </Td> }
                    { isWideVersion && model === 'occurrency' &&  <Td color={"gray.dark"} maxW={170}>
                      {item.day}
                    </Td>}
                   {isWideVersion && model === 'occurrency' &&  <Td color={"gray.dark"} maxW={170}>
                      {item.latitude}
                    </Td>}
                    {isWideVersion && model === 'occurrency' && <Td color={"gray.dark"} maxW={170}>
                      {item.longitude}
                    </Td>}
                    
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination
              totalCountOfRegisters={dataset.dataset.length}
              currentPage={page}
              registersPerPage={4}
              onPageChange={setPage}
            />
          </>
        </Box>
      </Flex>
    </Box>
  );
}
