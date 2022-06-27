import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement, useEffect, useMemo, useState } from "react";
import React from "react";
import { Flex } from "@chakra-ui/react";
import { useDataset } from "../../../hooks/useDataset";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}


export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath, push } = useRouter();
  const { setStep} = useDataset()

  const isActive = useMemo(() => {
    return shouldMatchExactHref
      ? asPath == (rest.href || asPath == rest.as)
      : (asPath.startsWith(String(rest.href))) || asPath.startsWith(String(rest.as))
  }, [asPath, shouldMatchExactHref, rest]);

  return (
    <Link {...rest} >
      <a  onClick={() => [push(rest.href), !isActive && setStep(1)]}>

      <Flex
        borderRadius="full"
        _hover={!isActive ? { bg: "gray.100" } : {}}
        bg={isActive ? "green.light" : "transparent"}
        minW={"260px"}
      >
        {cloneElement(children, {
          color: isActive ? "white" : "gray.primary",
        })}
      </Flex>
      </a>
    </Link>
  );
}

