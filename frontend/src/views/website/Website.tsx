import { Box, HStack, Text, VStack, Heading, Center, Image } from "@chakra-ui/react"
import { AUTH_PREFIX_PATH } from "../../config/AppConfig";
import Button from "../../components/CustomBtn/Button";
import useNavigation from "../../hooks/useNavigation";
import Features from "./Features"

const containerStyle = {
  bg: "brand_blue.300",
  color: "white",
  width: "full",
  height: "full",
  paddingX: "20px",
  paddingY: "16px"
}

const Website = () => {
  const { handleNavigate } = useNavigation();
  const proteinSequenceLink = "https://www.cup.uni-muenchen.de/ch/compchem/tink/as.html";

  return (
    <Box {...containerStyle}>
      <HStack justifyContent="space-between">
        <Text fontSize={24} fontWeight="bold">ProteinAnalyzer</Text>

        <HStack spacing={5}>
          <Button
            bg="brand_blue.100"
            paddingX={4}
            _hover={{ bg: "brand_blue.100 " }}
            onClick={() => handleNavigate(`${AUTH_PREFIX_PATH}/login`)}
          >
            Sign In
          </Button>

          <Button
            bg="brand_blue.100"
            paddingX={4}
            _hover={{ bg: "brand_blue.100 " }}
            onClick={() => handleNavigate(`${AUTH_PREFIX_PATH}/register`)}
          >
            Sign Up
          </Button>
        </HStack>
      </HStack>

      <HStack flexDirection={{ base: "column", md: "row"}} justifyContent="space-evenly">
        <Center>
          <VStack
            justifyContent="center"
            alignContent="center"
            paddingTop="40px"
            spacing={5}
            alignItems="flex-start"
            width="80%"
          >
            <Heading as="h2">About ProteinAnalyzer</Heading>
            <Text as="p" fontSize="lg">
              Proteins, the building blocks of life, are large, complex molecules that play
              many critical roles in the body. For example hemoglobin is a protein that
              moves oxygen in your blood to your muscles. Other proteins such as lactase
              enzymes help us digest milk.
            </Text>

            <Text as="p" fontSize="lg">
              A protein is a linear chain of amino acids. There are 20 <a href={proteinSequenceLink} target="_blank">standard amino acids.</a>
              This "alphabet" lets us represent a protein as a sequence of discrete tokens.
              This is known as a protein's primary structure.
            </Text>

            <Text as="p" fontSize="lg">
              In protein engineering, the goal is to improve the property of a protein
              sequence by changing its amino acid sequence (primary structure) and measuring
              the property of different variants. The projects start with a “wild type”
              protein that has a given reference sequence. Then mutations to this sequence
              are introduced and their results on a given property of that protein are measured
              in a laboratory.
            </Text>

            <Center>
              <Image src="/protein-sequence.png" width="60%" height="30%" />
            </Center>

            <Text as="p" fontSize="lg">
              The goal of this web app is to enable users to make sense of the changes
              introduced to a given protein sequence and how they affect a numerical
              property measured in the laboratory for each variant.
            </Text>

            <Text as="p" fontSize="lg">
              Using this web app, users can create a project by filling a project form.
              Then when they upload data corresponding to the project, they can visualize
              and analyze the results of their experiments.
            </Text>
          </VStack>
        </Center>

        <Features />
      </HStack>
    </Box>
  )
}

export default Website