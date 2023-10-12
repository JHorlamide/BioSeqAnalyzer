/* Libraries */
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineTitle } from "react-icons/md";
import { FieldErrors, UseFormReturn } from "react-hook-form";

/* Application Modules */
import { FormInput } from "../../../../components/CustomInput/FormInput/FormInput";
import { SelectInput } from "../../../../components/CustomInput/SelectInput/SelectInput";
import Button from "../../../../components/CustomBtn/Button";
import { ProjectFormData, CreateProjectFormField } from "../../../../schemas/DNASequence/DNASequenceProjectSchema";

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
} from "@chakra-ui/react";
import { TextAreaInput } from "../../../../components/CustomInput/TextAreaInput/TextAreaInput";

export interface ProjectFormProps {
  projectId?: string;
  projectData?: ProjectFormData;
  errors: FieldErrors<ProjectFormData>;
  isLoading: boolean;
  submitProject: (data: ProjectFormData) => Promise<void>;
  register: UseFormReturn<ProjectFormData>['register'];
  handleSubmit: UseFormReturn<ProjectFormData>['handleSubmit'];
};

const ProjectForm = (props: ProjectFormProps) => {
  const {
    errors,
    isLoading,
    projectId,
    projectData,
    register,
    handleSubmit,
    submitProject,
  } = props;

  const nucleotideTypeOptions = [
    { label: "DNA", value: "D" },
    { label: "RNA", value: "R" },
  ];

  const topologyOptions = [
    { label: "Circular", value: "C" },
    { label: "Linear", value: "L" },
    { label: "Both", value: "B" },
    { label: "Both Flip", value: "B_F" },
  ];

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
            {projectId ? "Updated Project" : "Create new project"}
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
                    children={<MdDriveFileRenameOutline color="brand_blue.2000" />}
                  />

                  <FormInput<CreateProjectFormField>
                    name="name"
                    placeholder="Enter project name"
                    register={register}
                    errors={errors}
                    defaultValue={projectData && projectData.name}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <FormInput<CreateProjectFormField>
                  name="description"
                  type="text"
                  placeholder="Enter description"
                  register={register}
                  errors={errors}
                  defaultValue={projectData && projectData.description}
                />
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
              <FormControl>
                <FormLabel>Bases</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pt="5px"
                    pointerEvents={"none"}
                    children={<MdOutlineTitle color="brand_blue.2000" />}
                  />

                  <FormInput<CreateProjectFormField>
                    name="bases"
                    register={register}
                    errors={errors}
                    placeholder="Enter project bases"
                    rules={{ required: "Bases is required", }}
                    defaultValue={projectData && projectData.bases}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <TextAreaInput
                  label="Sequence"
                  name="sequence"
                  register={register}
                  errors={errors}
                  placeholder="Enter sequence"
                  defaultValue={projectData && projectData.sequence}
                />
              </FormControl>
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

export default ProjectForm