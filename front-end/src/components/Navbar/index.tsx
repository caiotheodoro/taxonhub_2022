import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { GoVerified, GoSearch } from 'react-icons/go'
import { ActiveLink } from "./ActiveLink/ActiveLink";
import { NavItem } from "./NavItem";
interface NavProps {
    children: ReactNode;
}
interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: "verificação taxonômica", icon: GoVerified, href: "/taxonomies" },
    { name: "busca de ocorrências", icon: GoSearch, href: "/ocurrencies" },
];

export function Navbar({ children }: NavProps) {

    return (
        <Box w={"100%"} p={{ base: "1", sm: "3", lg: "5" }}  position="relative" mb="10">
            <Flex w="100%" h="80px" flexDir={"row"} justify="space-around" as="header" backdropFilter="saturate(100%) blur(4px)" position="fixed" zIndex={1000}>
                <Flex justify={"flex-start"} align="center"  >
                    <Link onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })
                    }

                    } textDecoration={"none"}
                        _hover={{
                            TextDecoration: "none",
                        }}
                    >

                        <Text fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }} fontWeight={"bold"}>

                            taxonhub
                        </Text>
                    </Link>
                </Flex>

                <Flex justify={"flex-end"} justifyContent={"center"} flexDir="column" align="center" w={{ base: "40%", sm: '50%', md: "40%", lg: "40%", xl: "30%" }} h="100%"  >
                    <Stack mt="5" columnGap={{ sm: "8px", lg: "15px" }} direction={{ base: "column", lg: "row" }}>

                        {LinkItems.map((link) => (
                            <ActiveLink key={link.name} href={link.href}>
                                <NavItem icon={link.icon}>
                                    {link.name}
                                </NavItem>
                            </ActiveLink>
                        ))}

                    </Stack>
                </Flex>
            </Flex>
            <Box as="main">
                {children}
            </Box>
        </Box >
    )
}