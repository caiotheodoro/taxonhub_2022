import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
    number: number;
    isCurrent?: boolean;
    onPageChange: (page: number) => void
}

export function PaginationItem({
    isCurrent = false,
    number,
    onPageChange
}: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button
                size='sm'
                fontSize='xs'
                w='4'
                disabled
                _disabled={{
                    bgColor: 'gray.500',
                    cursor: 'default'
                }}
                _hover={{
                    bgColor: 'yellow.dark',
                }}
            >
                {number}
            </Button>
        )
    }
    return (
        <Button
            size='sm'
            fontSize='xs'
            w='4'
            bg='gray.200'
            _hover={{
                bg: 'gray.300'
            }}
            onClick={() => onPageChange(number)}
        >
            {number}
        </Button>
    )
}