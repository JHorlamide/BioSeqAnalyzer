/* Libraries */
import { Box, Center, FormControl, FormLabel, HStack, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import useNavigation from "../../../../hooks/useNavigation";
import { DNA_SEQ_ENTRY } from "../../../../config/AppConfig";
import { useUpdateDNASeqProject } from "../../../../hooks/DNASequence/useDnaSeqProjectHandler";
import { FormInput } from "../../../../components/CustomInput/FormInput/FormInput";
import { CreateProjectFormField } from "../../../../schemas/DNASequenceProjectSchema";
import { SelectInput } from "../../../../components/CustomInput/SelectInput/SelectInput";
import { TextAreaInput } from "../../../../components/CustomInput/TextAreaInput/TextAreaInput";
import { nucleotideTypeOptions, topologyOptions } from "./CONSTANTS";


const UpdateDNASeqProjectForm = () => {
  const { handleNavigate } = useNavigation();
  const { projectId } = useParams();
  const {
    errors,
    isLoading,
    isLoadingUpdate,
    submitProject,
    handleSubmit,
    register
  } = useUpdateDNASeqProject(String(projectId))

  // const updateProjectHook = { projectId, ...useUpdateDNASeqProject(String(projectId)) };

  return (
    <Box width="full">
      <Button
        marginTop={-20}
        color="white"
        bg="brand_blue.300"
        _hover={{ bg: "brand_blue.200" }}
        leftIcon={<BsArrowLeft />}
        onClick={() => handleNavigate(DNA_SEQ_ENTRY)}
      >
        Back
      </Button>

      <Box marginTop={-20}>
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
                Updated Project
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

                <Button
                  color="white"
                  bg="brand_blue.300"
                  alignSelf="end"
                  type="submit"
                  isLoading={isLoadingUpdate}
                  _hover={{ bg: "brand_blue.200" }}
                >
                  Updated Project
                </Button>
              </VStack>
            </form>
          </Box>
        </Center>

        {/* <ProjectForm {...updateProjectHook} /> */}
      </Box>
    </Box>
  );
}

export default UpdateDNASeqProjectForm;