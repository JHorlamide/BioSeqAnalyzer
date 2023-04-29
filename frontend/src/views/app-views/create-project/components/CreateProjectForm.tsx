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
  Spinner,
  Center,
  HStack,
} from "@chakra-ui/react";
import { GiMolecule, GiGooeyMolecule, GiAcid } from "react-icons/gi";
import { SiMoleculer } from "react-icons/si";
import { MdOutlineTitle } from "react-icons/md";
import ProjectInput, { SelectInput } from "./ProjectInput";
import Button from "../../../../components/CustomBtn/Button";
import useProject from "../../../../hooks/useProject";

const goalOptions = [
  { label: "Maximize", value: "Maximize" },
  { label: "Minimize", value: "Minimize" },
];

const measuredPropertyOption = [
  { label: "Activity", value: "Activity" },
  { label: "Solubility", value: "Solubility" },
  { label: "Thermostability", value: "Thermostability" },
];

const CreateProject = () => {
  const {
    isLoading,
    loading,
    showRawSeqInput,
    showUniProtInput,
    isValid,
    errors,
    animoAcidSequence,
    handleSubmit,
    submitProject,
    register,
    toggleShowUniProtInput,
  } = useProject();

  return (
    <Center mt="-45px" justifyContent={{ base: "start", md: "center" }}>
      <Box width={{ base: "full", md: "50%" }}>
        <Box alignContent="start">
          <Text
            as="h2"
            fontWeight="semibold"
            fontSize="24px"
            textAlign={{ base: "end", md: "start" }}
          >
            Create new project
          </Text>
        </Box>

        <form onSubmit={handleSubmit(submitProject)}>
          <VStack spacing={3} paddingY={2}>
            <VStack
              spacing={3}
              bg="brand.50"
              borderRadius={10}
              paddingY={3}
              paddingX={3}
              width="full"
            >
              {showRawSeqInput && (
                <FormControl>
                  <Flex justifyContent="space-between" alignContent="center">
                    <FormLabel>Raw sequence (Optional)</FormLabel>

                    <Button
                      onClick={toggleShowUniProtInput}
                      variant="unstyled"
                      bg="none"
                      borderRadius="0"
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

                    <ProjectInput
                      inputProps={{
                        type: "string",
                        placeholder: "Copy and past raw sequence here...",
                      }}
                      name="uniprotId"
                      register={register}
                      error={errors.uniProtId?.message}
                    />
                  </InputGroup>
                </FormControl>
              )}

              {showUniProtInput && (
                <FormControl>
                  <Flex justifyContent="space-between">
                    <FormLabel>UniProt ID (Optional)</FormLabel>
                    <Button
                      onClick={toggleShowUniProtInput}
                      variant="unstyled"
                      bg="none"
                      borderRadius="0"
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

                    <ProjectInput
                      inputProps={{
                        type: "string",
                        placeholder: "Enter UniProtId here...",
                      }}
                      name="uniprotId"
                      register={register}
                      error={errors.uniProtId?.message}
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
                    children={<SiMoleculer color="gray.3000" />}
                  />

                  <ProjectInput
                    inputProps={{
                      type: "string",
                      placeholder: "Enter PDB ID here...",
                    }}
                    name="proteinPDBID"
                    register={register}
                    error={errors.proteinPDBID?.message}
                  />
                </InputGroup>
              </FormControl>
            </VStack>

            <VStack
              spacing={3}
              bg="brand.50"
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
                    error={errors.projectGoal?.message}
                  />

                  <SelectInput
                    label="Property Measured"
                    name="measuredProperty"
                    register={register}
                    selectOptions={measuredPropertyOption}
                    error={errors.measuredProperty?.message}
                  />
                </HStack>
              </FormControl>

              <FormControl>
                <FormLabel>Amino Acid sequence (Optional)</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pt="5px"
                    pointerEvents={"none"}
                    children={<GiAcid color="gray.3000" />}
                  />

                  <InputRightElement
                    pt="5px"
                    pointerEvents={"none"}
                    children={loading && <Spinner size="sm" />}
                  />

                  <ProjectInput
                    inputProps={{
                      type: "string",
                      placeholder: "",
                      defaultValue: animoAcidSequence,
                      value: animoAcidSequence,
                    }}
                    name="proteinAminoAcidSequence"
                    register={register}
                    error={errors.proteinAminoAcidSequence?.message}
                  />
                </InputGroup>
              </FormControl>
            </VStack>

            <VStack
              spacing={3}
              bg="brand.50"
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
                    children={<MdOutlineTitle color="gray.3000" />}
                  />

                  <ProjectInput
                    inputProps={{
                      type: "string",
                      placeholder: "Enter project title",
                    }}
                    name="projectTitle"
                    register={register}
                    error={errors.uniProtId?.message}
                  />
                </InputGroup>
              </FormControl>
            </VStack>

            <Button
              isLoading={isLoading}
              isDisabled={!isValid}
              alignSelf="end"
              type="submit"
            >
              Create Project
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default CreateProject;
