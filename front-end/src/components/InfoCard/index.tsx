import { Box, TableContainer, Text } from "@chakra-ui/react";

export function InfoCard() {
    return (
        <Box position={"absolute"} w="300px" mt="14" marginLeft={"20px"} h="50px" borderRadius="2px">
            Formato do header CSV:
            <Box w="100%" h="100%" bg="GrayText" borderRadius={"5px"} bottom="10%" left={{ base: "-10%", sm: "10%" }} >
                <TableContainer>
               
                </TableContainer>
                <Text  fontSize={"12px"} color={"white"} ml="5" mt="2" w="100%">
                </Text>
                <Text fontSize={"12px"} color={"white"} ml="5" mt="2">
                    BinomialName
                </Text>
            </Box>
        </Box>
    )
}