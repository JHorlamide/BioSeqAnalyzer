/* Libraries */
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";

/* Chakra UI */
import {
  Box,
  Text,
  FormControl,
  VStack,
  Center,
  HStack,
} from "@chakra-ui/react";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import { nucleotideTypeOptions, topologyOptions } from "./CONSTANTS";
import { SelectInput } from "../../../../components/CustomInput/SelectInput/SelectInput";
import { ProjectFormData, CreateProjectFormField } from "../../../../schemas/DNASequence/DNASequenceProjectSchema";

export interface ProjectFormProps {
  projectData?: ProjectFormData;
  errors: FieldErrors<ProjectFormData>;
  isLoading: boolean;
  projectFile: File | null | undefined;
  submitProject: (data: ProjectFormData) => Promise<string | void>;
  register: UseFormReturn<ProjectFormData>['register'];
  handleSubmit: UseFormReturn<ProjectFormData>['handleSubmit'];
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProjectFormFileUpload = (props: ProjectFormProps) => {
  const SELECT_FILE_MSG = "Select file or drag and drop file to upload";
  const {
    errors,
    isLoading,
    projectData,
    projectFile,
    register,
    handleSubmit,
    submitProject,
    handleDrop,
    handleFileInputChange,
  } = props;

  return (
    <Center justifyContent={{ base: "start", md: "center" }} color="white">
      <Box width={{ base: "full", md: "50%" }}>
        <Box alignContent="start">
          <Text
            as="h2"
            color="white"
            fontWeight="semibold"
            fontSize="24px"
            textAlign={{ base: "end", md: "start" }}
          >
            Create new project
          </Text>
        </Box>

        <form onSubmit={handleSubmit(submitProject)}>
          <VStack spacing={5} paddingY={2}>
            <VStack
              spacing={3}
              bg="brand_blue.300"
              borderRadius={10}
              paddingY={5}
              paddingX={3}
              width="full"
            >
              <FormControl isRequired>
                <HStack spacing={2}>
                  <SelectInput<CreateProjectFormField>
                    label="Select nucleotide type"
                    name="nucleotide_type"
                    register={register}
                    selectOptions={nucleotideTypeOptions}
                    errors={errors}
                    selectProps={{
                      value: projectData && projectData.nucleotide_type,
                    }}
                  />

                  <SelectInput<CreateProjectFormField>
                    label="Select topology"
                    name="topology"
                    register={register}
                    selectOptions={topologyOptions}
                    errors={errors}
                    selectProps={{
                      value: projectData && projectData.topology,
                      defaultValue: projectData && projectData.topology,
                    }}
                  />
                </HStack>
              </FormControl>
            </VStack>

            <VStack
              spacing={3}
              bg="brand_blue.300"
              borderRadius={10}
              paddingY={5}
              paddingX={3}
              width="full"
            >
              <Box
                width="full"
                padding={4}
                borderRadius="md"
                border="2px dotted white"
                textAlign="center"
                onDrop={handleDrop}
              >
                <HStack spacing={4}>
                  <Text
                    whiteSpace="nowrap"
                    textAlign="center"
                    width="full"
                  >
                    {projectFile ? projectFile.name : SELECT_FILE_MSG}
                  </Text>

                  <Button
                    width={60}
                    as="label"
                    bg="brand_blue.200"
                    color="white"
                    htmlFor="fileInput"
                    paddingX={2}
                    leftIcon={<AiOutlineCloudUpload size={20} />}
                    _hover={{ bg: "brand_blue.200", cursor: "pointer" }}
                  >
                    Choose file
                  </Button>

                  <input
                    id="fileInput"
                    type="file"
                    accept=".txt, .gbk, .gb, .genbank, .fa, .fasta, .dna, .seq"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />
                </HStack>
              </Box>
            </VStack>

            <Button
              isLoading={isLoading}
              bg="brand_blue.300"
              color="white"
              alignSelf="end"
              type="submit"
              _hover={{ bg: "brand_blue.200" }}
            >
              Create Project
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}

export default ProjectFormFileUpload