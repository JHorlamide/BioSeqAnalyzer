/* React */
import { ReactElement } from 'react';

/* Libraries */
import { Link } from "react-router-dom";
import { FcBiotech } from 'react-icons/fc';
import { GiMolecule } from "react-icons/gi";

/* Application Modules */
import { AUTH_PREFIX_PATH } from "../../config/AppConfig";
import Button from "../../components/CustomBtn/Button";
import useNavigation from "../../hooks/useNavigation";

import {
  Box,
  HStack,
  Text,
  VStack,
  Heading,
  Center,
  Image,
  Container,
  Flex,
  Icon,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  status: string;
}

const containerStyle = {
  bg: "brand_blue.300",
  color: "white",
  width: "full",
  height: "full",
  paddingX: "20px",
  paddingY: "16px"
}

const Card = (props: CardProps) => {
  const { heading, description, icon, status } = props;

  return (
    <Box
      maxW={{ base: 'full', md: '350px' }}
      width="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}>
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}>
          {icon}
        </Flex>

        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>

        <HStack>
          <Text fontWeight="semibold" colorScheme={'blue'} size={'sm'}>
            Status:
          </Text>

          <Text colorScheme={'blue'} size={'sm'}>
            {status}
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
};

function Features() {
  return (
    <Box p={4} width="full">
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Features
        </Heading>

        <Container maxW={'5xl'} mt={12}>
          <Flex width="full" flexWrap="wrap" gridGap={6} justify="center">
            <Card
              heading={"Analysis of proteins engineered data"}
              icon={<Icon as={GiMolecule} w={10} h={10} color="#08355a" />}
              description={"Visualize and analyze the results of their experiments."}
              status={"Functional"}
            />

            <Card
              heading={"DNA sequence analysis"}
              icon={<Icon as={FcBiotech} w={10} h={10} />}
              status="Functional"
              description={"Allows researchers to upload, store, and analyze DNA sequence data."}
            />
          </Flex>
        </Container>
      </Stack>
    </Box>
  );
}

const Website = () => {
  const { handleNavigate } = useNavigation();

  return (
    <Box {...containerStyle}>
      <HStack justifyContent="space-between">
        <Link to="/website">
          <Text fontSize={24} fontWeight="bold">BioSeqAnalyzer</Text>
        </Link>

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

      <Flex mt={10}>
        <Center>
          <VStack
            justifyContent="center"
            alignContent="center"
            paddingTop="40px"
            spacing={5}
            alignItems="flex-start"
            width="80%"
          >
            <Heading as="h2">Introducing BioSeqAnalyzer -
              Your Comprehensive Protein & DNA/RNA Analysis Platform
            </Heading>

            <Text>
              Welcome to BioSeqAnalyzer, where I empower users to decipher and make sense of
              their experimental data effortlessly. The platform, initially renowned as ProteinAnalyzer,
              has evolved to cater not only to protein sequences but also to the intricate world of DNA/RNA
              sequences.
            </Text>

            <Text fontWeight="bold" fontSize={20}>Protein Analysis:</Text>
            <Box pl={5}>
              <Text as="p" fontSize="lg">
                Unravel the impact of sequence alterations on a protein's behavior. BioSeqAnalyzer
                allows users to comprehend changes introduced to a specific protein sequence and discern
                their influence on various numerical properties measured in the laboratory. Dive deep into
                the realm of protein engineering, starting with a reference 'wild type' protein and exploring
                mutations to uncover valuable insights.
              </Text>
            </Box>

            <Text fontWeight="bold" fontSize={20}>DNA/RNA Sequencing:</Text>
            <Box pl={5}>
              <Text as="p" fontSize="lg">
                Explore the vast landscape of genetic information with our DNA/RNA sequencing
                capabilities. Visualize and analyze DNA/RNA sequences effortlessly, whether you're
                creating projects through our user-friendly form, uploading files in multiple formats,
                or seamlessly importing data from the NCBI database. BioSeqAnalyzer provides a
                collaborative workspace where users can share project links, invite team members,
                and collectively unravel the mysteries encoded in genetic sequences.
              </Text>
            </Box>

            <Box>
              <Text as="p" fontSize="lg">
                BioSeqAnalyzer is not just a tool; it's your gateway to understanding, analyzing,
                and collaborating on experimental data in the world of proteins, DNA, and RNA.
                Elevate your research with precision and efficiency.
              </Text>
            </Box>
          </VStack>
        </Center>
        <Features />
      </Flex>
    </Box>
  )
}

export default Website