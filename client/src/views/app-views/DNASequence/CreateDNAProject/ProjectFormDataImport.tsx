import React, { useRef } from 'react'

/* Libraries */
import { BsSearch } from "react-icons/bs";
import { FieldErrors, UseFormReturn } from "react-hook-form";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import { ProjectFormData, CreateProjectFormField } from "../../../../schemas/DNASequenceProjectSchema";
import { FormInput } from "../../../../components/CustomInput/FormInput/FormInput";

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
  Input,
} from "@chakra-ui/react";
import { nucleotideTypeOptions, topologyOptions } from './CONSTANTS';
import { SelectInput } from '../../../../components/CustomInput/SelectInput/SelectInput';

// Example searches to be implemented:
// https://www.addgene.org/browse/sequence/364796/ (Addgene URL)
// BRCA2 (Gene name)
// M62653 (NCBI Accession)
// ENSMUSG00000041147 (ENSEMBL ID)
// BBa_E0040 (Registry of Standard Biological Parts)
// JPUB_001430 (JBEI Public Registry)


export interface Props {
  isLoading: boolean;
  errors: FieldErrors<ProjectFormData>;
  submitProject: (data: ProjectFormData) => Promise<string | void>;
  register: UseFormReturn<ProjectFormData>['register'];
  handleSubmit: UseFormReturn<ProjectFormData>['handleSubmit'];
};

const ProjectFormDataImport = (props: Props) => {
  const {
    errors,
    isLoading,
    register,
    handleSubmit,
    submitProject,
  } = props;

  return (
    <Center py={5} justifyContent={{ base: "start", md: "center" }} color="white">
      <Box width={{ base: "full", md: "50%" }}>
        <Box py={5} alignContent="start">
          <Text
            as="p"
            color="white"
            fontWeight="semibold"
            fontSize="16px"
            textAlign={{ base: "end", md: "center" }}
          >
            Import sequences by entering NCBI accession numbers. 
            Currently, only the NCBI database is integrated.
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
              pt={2}
              paddingBottom={4}
              paddingX={3}
              width="full"
            >
              <FormControl isRequired>
                <FormLabel>Search</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pt="5px"
                    pointerEvents={"none"}
                    children={<BsSearch color="brand_blue.2000" />}
                  />

                  <FormInput<CreateProjectFormField>
                    name="sequence_id"
                    register={register}
                    errors={errors}
                  />
                </InputGroup>
              </FormControl>
            </VStack>

            <Button
              width={24}
              bg="brand_blue.300"
              color="white"
              alignSelf="end"
              type="submit"
              isLoading={isLoading}
              _hover={{ bg: "brand_blue.200" }}
            >
              Import
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}

export default ProjectFormDataImport