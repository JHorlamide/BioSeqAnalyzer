import { Box, Flex, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { BsFolderFill } from 'react-icons/bs';
import ProteinSequenceViewer from './ProteinSequenceViewer';

export interface OverviewProps {
  proteinPDBID?: string;
  projectTitle?: string;
  projectGoal?: string;
  measuredProperty?: string;
  pdbFileUrl?: string;
}

const ProteinViewer = (props: OverviewProps) => {
  const {
    proteinPDBID,
    pdbFileUrl,
    projectTitle,
    projectGoal,
    measuredProperty
  } = props;

  const headingStyle = {
    fontWeight: 600,
    fontStyle: "italic",
  }

  const containerStyle = {
    width: "100%",
    height: "550px",
    marginTop: "1%",
    display: "flex",
    justifyContent: "center",
  }

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Box display="flex" alignItems="center">
          <Text fontSize={20} fontWeight="normal">
            Project Title:
          </Text>

          <HStack ml={2} justify="space-between">
            <BsFolderFill size={20} />
            <span style={headingStyle}>{projectTitle}</span>
          </HStack>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Flex>
            <Text fontSize={20} fontWeight="normal">Objectives: </Text>

            <HStack ml={2}>
              <Text
                bg="brand_blue.300"
                paddingX={4}
                paddingY={1}
                borderRadius="full"
              >
                Project Goal: <span style={headingStyle}>{projectGoal}</span>
              </Text>

              <Text
                bg="brand_blue.300"
                paddingX={4}
                paddingY={1}
                borderRadius="full"
              >
                Measured Property: <span style={headingStyle}>{measuredProperty}</span>
              </Text>
            </HStack>
          </Flex>

          {pdbFileUrl && (
            <Link
              href={pdbFileUrl}
              target="_blank"
              bg="brand_blue.100"
              fontWeight="500"
              fontSize={["0.875rem", "1rem"]}
              borderRadius="full"
              paddingX={4}
              paddingY={2}
              _hover={{
                fontStyle: "none"
              }}
            >
              View protein structure on RCSB
            </Link>
          )}
        </Box>
      </Stack>

      <ProteinSequenceViewer
        proteinPDBID={proteinPDBID}
        containerStyle={containerStyle}
      />
    </Stack>
  );
};

export default ProteinViewer;
