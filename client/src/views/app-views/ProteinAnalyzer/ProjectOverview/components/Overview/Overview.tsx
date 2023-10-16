/* Chakra UI */
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';

/* Application Modules */
import ProteinSequenceViewer from '../ProteinSequenceViewer/ProteinSequenceViewer';

export interface OverviewProps {
  proteinPDBID?: string;
  projectTitle?: string;
  projectGoal?: string;
  pdbFileUrl?: string;
  measuredProperty?: string;
  proteinAminoAcidSequence?: string;
}

const ProteinViewer = (props: OverviewProps) => {
  const {
    proteinPDBID,
    pdbFileUrl,
    projectTitle,
    projectGoal,
    measuredProperty,
    proteinAminoAcidSequence
  } = props;

  return (
    <Box marginTop="-3">
      <Stack spacing={4} marginBottom={1}>
        <Box display="flex" alignItems="center">
          <Box display="flex" gap={2} alignItems="center">
            <Text fontSize={20} fontWeight="bold" color="white">
              Project Title:
            </Text>

            <Text style={headingStyle}>{projectTitle}</Text>
          </Box>

          <Box
            marginLeft={5}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex>
              <Text fontSize={20} fontWeight="bold" color="white">Objectives: </Text>

              <HStack ml={2}>
                <Text
                  bg="brand_blue.300"
                  paddingX={4}
                  paddingY={1}
                  color="white"
                  borderRadius="full"
                >
                  Project Goal: <span style={headingStyle}>{projectGoal}</span>
                </Text>

                <Text
                  bg="brand_blue.300"
                  paddingX={4}
                  paddingY={1}
                  color="white"
                  borderRadius="full"
                >
                  Measured Property: <span style={headingStyle}>{measuredProperty}</span>
                </Text>
              </HStack>
            </Flex>
          </Box>
        </Box>
      </Stack>

      <ProteinSequenceViewer
        containerStyle={containerStyle}
        pdbFileUrl={pdbFileUrl}
        proteinPDBID={proteinPDBID}
        proteinAminoAcidSequence={proteinAminoAcidSequence}
      />
    </Box>
  );
};

const headingStyle = {
  fontWeight: 600,
  color: "white",
  fontStyle: "italic",
};

const containerStyle = {
  width: "80%",
  height: "370px",
  justifyContent: "center",
  position: "absolute",
  bottom: 25,
};

export default ProteinViewer;
