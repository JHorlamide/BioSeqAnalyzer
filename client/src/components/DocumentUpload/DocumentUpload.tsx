/* React */
import React, { Fragment, useState } from "react";

/* Chakra UI */
import {
  Box, Center, Image,
  useDisclosure,
  Modal,
  Flex,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  HStack,
  Text
} from "@chakra-ui/react";

/* Libraries */
import { AiOutlineCloudUpload, AiOutlineCloudDownload } from "react-icons/ai"
import { toast } from "react-hot-toast";

/* Application Modules */
import Button from "../CustomBtn/Button";
import useErrorToast from "../../hooks/useErrorToast";
import { SAMPLE_CSV_LINK } from "../../config/AppConfig";
import { useUploadProjectFileMutation } from "../../services/proteinProject/proteinProjectAPI";

interface Props {
  projectId: string;
  projectType: "Protein" | "DNA";
  uploadDescription?: string;
}

const DocumentUpload = (props: Props) => {
  const { projectId, projectType, uploadDescription } = props;
  const { handleError } = useErrorToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDragOver, setIsDragOver] = useState(false);
  const [projectFile, setProjectFile] = useState<File | null>();
  const [uploadProjectFile, { isLoading }] = useUploadProjectFileMutation();
  const SELECT_FILE_MSG = "Select file or drag and drop file to upload";

  const handleFileUpload = async (file: File) => {
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await uploadProjectFile({ data: form, projectId }).unwrap();

      if (response.status === "Success") {
        onClose();
        setProjectFile(null);
        toast.success(response.message);
      }
    } catch (error: any) {
      handleError(error);
      setProjectFile(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    setProjectFile(file);
    handleFileUpload(file);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setProjectFile(file);

    if (file) {
      handleFileUpload(file);
    } else {
      toast.error("No file selected");
    }
  };

  const previewSampleCSVFile = () => {
    window.open(SAMPLE_CSV_LINK, "_blank")
  }

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="brand_blue.300" width="full">
          <Flex justifyContent="space-between" alignItems="center">
            <ModalHeader fontSize="18px" color="white">Result</ModalHeader>

            {projectType === "Protein" && (
              <Button
                color="white"
                bg="brand_blue.200"
                leftIcon={isLoading ? <AiOutlineCloudUpload /> : <AiOutlineCloudDownload />}
                fontWeight="semibold"
                onClick={previewSampleCSVFile}
                isDisabled={isLoading}
                _hover={{ bg: "brand_blue.200" }}
              >
                {isLoading ? "Uploading..." : "Download template"}
              </Button>
            )}

            {projectType === "DNA" || isLoading && <Text color="white">Uploading...</Text>}
          </Flex>

          <ModalBody
            width="full"
            padding={4}
            border="2px dotted white"
            borderRadius="md"
            textAlign="center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            cursor="pointer"
          >
            <HStack spacing={4}>
              <Button
                as="label"
                bg="none"
                width="full"
                color="white"
                htmlFor="fileInput"
                leftIcon={<AiOutlineCloudUpload size={20} />}
                _hover={{ bg: "none", cursor: "pointer" }}
                paddingX={2}
              >
                {projectFile ? projectFile.name : SELECT_FILE_MSG}
              </Button>

              <input
                id="fileInput"
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Center marginLeft={-20}>
        <Flex
          direction="column"
          justify="center"
          maxWidth="250px"
          marginTop="100px"
        >
          <Image src="/stacked.webp" boxSize="100px" />

          <Box paddingY={4} display="flex" flexDirection="column">
            <Text as="h1" fontWeight="bold" fontSize="19px" color="white">
              Upload File
            </Text>

            <Text as="p" pt={2} color="white" fontStyle="italic">{uploadDescription}</Text>
          </Box>

          <Button
            color="white"
            bg="brand_blue.300"
            onClick={onOpen}
            leftIcon={<AiOutlineCloudUpload size={20} />}
            _hover={{ bg: "brand_blue.200" }}
          >
            Upload Result
          </Button>
        </Flex>
      </Center>
    </Fragment>
  );
}

export default DocumentUpload