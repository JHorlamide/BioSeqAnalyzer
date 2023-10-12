import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { FcBiotech } from 'react-icons/fc';
import { GiMolecule } from "react-icons/gi"

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  status: string;
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

export default function gridListWith() {
  return (
    <Box p={4} width="full">
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Features
        </Heading>

        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Please note that not all the features listed below have been implemented;
          currently, only the creation and analysis upload of project data are functional.
        </Text>
      </Stack>

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
    </Box>
  );
}