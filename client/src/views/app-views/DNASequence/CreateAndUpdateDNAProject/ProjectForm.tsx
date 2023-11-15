/* Libraries */
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { TbFileDescription } from "react-icons/tb";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import { FormInput } from "../../../../components/CustomInput/FormInput/FormInput";
import { SelectInput } from "../../../../components/CustomInput/SelectInput/SelectInput";
import { nucleotideTypeOptions, topologyOptions } from "./CONSTANTS";
import { ProjectFormData, CreateProjectFormField } from "../../../../schemas/DNASequenceProjectSchema";
import { TextAreaInput } from "../../../../components/CustomInput/TextAreaInput/TextAreaInput";

/* Chakra UI */
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  VStack,
  Center,
  HStack,
  Spinner,
} from "@chakra-ui/react";

export interface ProjectFormProps {
  isLoading: boolean;
  projectId?: string;
  file_content?: string;
  sequence?: string;
  isLoadingRetrieve?: boolean;
  errors: FieldErrors<ProjectFormData>;
  submitProject: (data: ProjectFormData) => Promise<string | void>;
  register: UseFormReturn<ProjectFormData>['register'];
  handleSubmit: UseFormReturn<ProjectFormData>['handleSubmit'];
};

const ProjectForm = ({
  errors,
  isLoading,
  projectId,
  file_content,
  sequence,
  isLoadingRetrieve,
  register,
  handleSubmit,
  submitProject,
}: ProjectFormProps) => {
  const isLoadingName = isLoadingRetrieve
    ? <Spinner size="sm" speed="0.65s" thickness="4px" emptyColor="brand_blue.200" />
    : <MdDriveFileRenameOutline color="brand_blue.2000" />

  const isLoadingDescription = isLoadingRetrieve
    ? <Spinner size="sm" speed="0.65s" thickness="4px" emptyColor="brand_blue.200" />
    : <TbFileDescription color="brand_blue.2000" />

  const showBasesSection = file_content || sequence ? false : true;

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
            {projectId ? "Update project" : "Create new project"}
          </Text>
        </Box>

        <form onSubmit={handleSubmit(submitProject)}>
          <VStack spacing={5} paddingY={2}>
            <VStack
              spacing={3}
              bg="brand_blue.300"
              borderRadius={10}
              paddingY={3}
              paddingX={3}
              width="full"
            >
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pt="5px"
                    pointerEvents={"none"}
                    children={isLoadingName}
                  />

                  <FormInput<CreateProjectFormField>
                    name="name"
                    placeholder="Enter project name"
                    register={register}
                    errors={errors}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pt="5px"
                    pointerEvents={"none"}
                    children={isLoadingDescription}
                  />

                  <FormInput<CreateProjectFormField>
                    name="description"
                    type="text"
                    placeholder="Enter description"
                    register={register}
                    errors={errors}
                  />
                </InputGroup>

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
              <FormControl isRequired>
                <HStack spacing={2}>
                  <SelectInput<CreateProjectFormField>
                    label="Select nucleotide type"
                    name="nucleotide_type"
                    register={register}
                    selectOptions={nucleotideTypeOptions}
                    errors={errors}
                  />

                  <SelectInput<CreateProjectFormField>
                    label="Select topology"
                    name="topology"
                    register={register}
                    selectOptions={topologyOptions}
                    errors={errors}
                  />
                </HStack>
              </FormControl>
            </VStack>

            {showBasesSection && (
              <VStack
                spacing={3}
                bg="brand_blue.300"
                borderRadius={10}
                paddingY={5}
                paddingX={3}
                width="full"
              >
                <FormControl>
                  <FormLabel>Bases</FormLabel>
                  <TextAreaInput<CreateProjectFormField>
                    name="bases"
                    register={register}
                    errors={errors}
                    placeholder="Enter project bases"
                    rules={{ required: "Bases is required" }}
                  />
                </FormControl>
              </VStack>
            )}

            <Button
              isLoading={isLoading}
              bg="brand_blue.300"
              color="white"
              alignSelf="end"
              type="submit"
              _hover={{ bg: "brand_blue.200" }}
            >
              {projectId ? "Update project" : "Create Project"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}

export default ProjectForm