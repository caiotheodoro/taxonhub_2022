import { Button, Flex, IconButton, Input, useOutsideClick } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import React from "react";
import { CustomButton } from "../CustomButton";
import { useDataset } from "../../hooks/useDataset";
import {FcInfo} from "react-icons/fc";
import { InfoCard } from "../InfoCard";
interface HTMLInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget;
}

/**
 *
 * @return {toast}
 */
export function SendCSV(): JSX.Element {
  const { setFile, setStep } = useDataset();
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [fileName, setFileName] = useState<string | undefined>("Enviar CSV");
  const ref = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false);


 
  const handleChange = (e: HTMLInputEvent) => {
    if (!e.target.files?.length) {
      return;
    }

    const files = e.target.files?.[0];
    setFile(files);

    if (files?.name.split(".").pop() !== "csv") {
      return toast.error("Formato errado.");
    }

    if (files?.size > 10000000) {
      return toast.error("Tamanho máximo excedido (10MB).");
    }

    setFileName(files?.name);
    setStep(2);
    return toast.success("Arquivo adicionado.");
  };

  return (
    <Flex position={"relative"}>
      <CustomButton icon={FiUpload} onClick={() => fileRef.current?.click()}>
        {fileName}
      </CustomButton>
      <Input
        ref={fileRef}
        onChange={handleChange}
        multiple={false}
        type="file"
        accept=".csv"
        sx={{ border: "none", display: "none" }}
      />
      <IconButton
        borderRadius={"full"}
        aria-label='Informação sobre o arquivo'
        ref={ref}
        ml="3"
        onClick={() => setVisible(!visible)}
      >
        <FcInfo size={"20px"} />
      </IconButton>
      {visible && <InfoCard />}
    </Flex>
  );
}
