import React, { Fragment, useState } from "react";
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
import Button from "../../../../../../components/CustomBtn/Button";
import { AiOutlineCloudUpload, AiOutlineCloudDownload } from "react-icons/ai"
import { SAMPLE_CSV_LINK } from '../../../../../../config/AppConfig';
import { useUploadProjectFileMutation, useGetProjectQuery } from '../../../../../../services/project/projectApi';
import { toast } from 'react-hot-toast';
import Utils from '../../../../../../utils';

interface Props {
  projectId: string;
}

const DocumentUpload = ({ projectId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDragOver, setIsDragOver] = useState(false);
  const [projectFile, setProjectFile] = useState<File | null>();
  const [uploadProjectFile, { isLoading, isError }] = useUploadProjectFileMutation();

  const handleFileUpload = async (file: File) => {
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await uploadProjectFile({ data: form, projectId }).unwrap();

      if (response.status === "Success") {
        toast.success(response.message);
        onClose();
      }
    } catch (error: any) {
      const errorMessage = Utils.getErrorMessage(error);
      toast.error(errorMessage);
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
    setProjectFile(file);

    if (file) {
      handleFileUpload(file);
    }
  };

  const downloadSampleCSVFile = () => {
    window.open(SAMPLE_CSV_LINK, "_blank")
  }

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="brand_blue.300" width="full">
          <Flex justifyContent="space-between" alignItems="center">
            <ModalHeader fontSize="18px" color="white">Result</ModalHeader>
            {isError && <Text color="red.500">Failed to upload the csv file. Please try again</Text>}
            {isLoading ? (
              <Text paddingX={4} color="white">Uploading...</Text>
            ) : (
              <Button
                color="white"
                bg="brand_blue.200"
                leftIcon={<AiOutlineCloudDownload />}
                fontWeight="semibold"
                onClick={downloadSampleCSVFile}
                _hover={{ bg: "brand_blue.200" }}
              >
                Download template
              </Button>
            )}
          </Flex>

          <ModalBody width="full"
            p={4}
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
                {projectFile ? projectFile.name : "Select a CSV file to upload or drag and drop it here"}
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
              Upload your result
            </Text>

            <Text as="p" pt={2} color="white" fontStyle="italic">
              Here’s a quick and clear explanation of how results work
              here so you know what you are about to do next.
            </Text>
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