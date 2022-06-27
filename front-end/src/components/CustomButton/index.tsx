import { Button, Icon } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";


interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    icon?: IconType;
}
export function CustomButton({children, onClick, icon,  ...rest}: ButtonProps) {
  return (
      <Button
      {...rest}
      leftIcon={icon && <Icon as={icon} />}
        onClick={onClick}
      fontFamily={"Poppins"}
        bgColor="green.light"
        _hover={{
            bg: "#ACBEA1",
            color: "white",
        }}
        variant="solid"
      >
        {children}
      </Button>
  );
}
