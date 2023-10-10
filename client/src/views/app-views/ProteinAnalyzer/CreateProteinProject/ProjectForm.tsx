/* Libraries */
import { GiMolecule, GiGooeyMolecule } from "react-icons/gi";
import { SiMoleculer } from "react-icons/si";
import { MdOutlineTitle } from "react-icons/md";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "../../../../schemas/protineAnalyzer/protinProjectSchema";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import { IProject } from "../../../../schemas/protineAnalyzer/protinProjectSchema";
import { FormInput } from "../../../../components/CustomInput/FormInput/FormInput"
import { SelectInput } from "../../../../components/CustomInput/SelectInput/SelectInput";

/* Chakra UI */
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Flex,
  Center,
  HStack,
} from "@chakra-ui/react";

export interface ProjectFormProps {
  projectId?: string;
  projectData?: ProjectFormData;
  errors: FieldErrors<ProjectFormData>;
  isValid: boolean;
  isLoading: boolean;
  showRawSeqInput: boolean;
  showUniProtInput: boolean;
  submitProject: (data: ProjectFormData) => Promise<void>;
  register: UseFormReturn<ProjectFormData>['register'];
  handleSubmit: UseFormReturn<ProjectFormData>['handleSubmit'];
  toggleShowUniProtInput: () => void;
};

const ProjectForm = (props: ProjectFormProps) => {
  const {
    errors,
    isValid,
    isLoading,
    projectId,
    projectData,
    showUniProtInput,
    showRawSeqInput,
    register,
    handleSubmit,
    submitProject,
    toggleShowUniProtInput
  } = props;

  const goalOptions = [
    { label: "Maximize", value: "Maximize" },
    { label: "Minimize", value: "Minimize" },
  ];

  const measuredPropertyOption = [
    { label: "Activity", value: "Activity" },
    { label: "Solubility", value: "Solubility" },
    { label: "Thermostability", value: "Thermostability" },
  ];

  return (
    <Center mt="-45px" justifyContent={{ base: "start", md: "center" }} color="white">
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
              {showRawSeqInput && (
                <FormControl>
                  <Flex justifyContent="space-between" alignItems="center">
                    <FormLabel>Raw sequence (Optional)</FormLabel>

                    <Button
                      onClick={toggleShowUniProtInput}
                      bg="brand_blue.100"
                      marginBottom={1}
                      _hover={{
                        bg: "brand_blue.50"
                      }}
                    >
                      Use ID instead
                    </Button>
                  </Flex>

                  <InputGroup>
                    <InputLeftElement
                      pt="5px"
                      pointerEvents={"none"}
                      children={<GiGooeyMolecule color="gray.3000" />}
                    />

                    <InputRightElement
                      pt="5px"
                      pointerEvents={"none"}
                    />

                    <FormInput<IProject>
                      name="proteinAminoAcidSequence"
                      placeholder="Enter raw sequence"
                      rules={{ required: "You must enter a name" }}
                      register={register}
                      errors={errors}
                      defaultValue={projectData && projectData.proteinAminoAcidSequence}
                    />
                  </InputGroup>
                </FormControl>
              )}

              {showUniProtInput && (
                <FormControl>
                  <Flex justifyContent="space-between" alignItems="center">
                    <FormLabel>UniProt ID (Optional)</FormLabel>
                    <Button
                      onClick={toggleShowUniProtInput}
                      bg="brand_blue.100"
                      marginBottom={1.5}
                      _hover={{
                        bg: "brand_blue.100"
                      }}
                    >
                      Use raw sequence instead
                    </Button>
                  </Flex>

                  <InputGroup>
                    <InputLeftElement
                      pt="5px"
                      pointerEvents={"none"}
                      children={<GiMolecule color="gray.3000" />}
                    />

                    <FormInput<IProject>
                      name="uniprotId"
                      placeholder="Enter Uniprot ID"
                      rules={{ required: "Uniprot ID is required" }}
                      register={register}
                      errors={errors}
                      defaultValue={projectData && projectData.uniprotId}
                    />
                  </InputGroup>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Structure (Optional)</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pt="5px"
                    pointerEvents={"none"}
                    children={<SiMoleculer color="brand_blue.2000" />}
                  />

                  <FormInput<IProject>
                    name="proteinPDBID"
                    placeholder="Enter PDB ID here..."
                    register={register}
                    errors={errors}
                    defaultValue={projectData && projectData.proteinPDBID}
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
              <FormControl>
                <HStack spacing={2}>
                  <SelectInput
                    label="Project Goal"
                    name="projectGoal"
                    register={register}
                    selectOptions={goalOptions}
                    errors={errors}
                    selectProps={{
                      value: projectData && projectData.projectGoal,
                    }}
                  />

                  <SelectInput
                    label="Property Measured"
                    name="measuredProperty"
                    register={register}
                    selectOptions={measuredPropertyOption}
                    errors={errors}
                    selectProps={{
                      value: projectData && projectData.measuredProperty,
                      defaultValue: projectData && projectData.measuredProperty,
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
                <FormLabel>Project title</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pt="5px"
                    pointerEvents={"none"}
                    children={<MdOutlineTitle color="brand_blue.2000" />}
                  />

                  <FormInput<IProject>
                    name="projectTitle"
                    register={register}
                    errors={errors}
                    placeholder="Enter project title"
                    rules={{ required: "Project title cannot be empty" }}
                    defaultValue={projectData && projectData.projectTitle}
                  />
                </InputGroup>
              </FormControl>
            </VStack>

            <Button
              isLoading={isLoading}
              isDisabled={!isValid}
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
  );
};

export default ProjectForm;
