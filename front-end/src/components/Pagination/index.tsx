import { Stack, Box, Text, Input } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => { return from + index + 1 })
        .filter(page => page > 0);
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage= 1,
    onPageChange
}: PaginationProps) {

    const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);


    const previousPage = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];

    const nextPage = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : [];

    return (
        <Stack
            direction="row"
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
        

            <Box color={"white"}>
                <strong>{(currentPage - 1)* registersPerPage}</strong> - <strong>{currentPage * registersPerPage }</strong> de <strong>{totalCountOfRegisters}</strong>
            </Box>
            
            <Stack direction="row" spacing="2">
         

                {currentPage > (siblingsCount + 1) && (
                    <>

                        <PaginationItem onPageChange={onPageChange} number={1} />
                        {currentPage > (siblingsCount + 2) && <Text color="gray.300" width={"8"} textAlign={"center"}>...</Text>}
                    </>
                )

                }

                {previousPage.length > 0 && previousPage.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                })}

                <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />
                {nextPage.length > 0 && nextPage.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                })}

                {currentPage + siblingsCount < lastPage && (
                    <>
                        {currentPage + siblingsCount + 1 < lastPage && <Text color="gray.300" width={"8"} textAlign={"center"}>...</Text>}
                        <PaginationItem onPageChange={onPageChange} number={lastPage} />
                    </>
                )}

            </Stack>
        </Stack>
    )
}