import { useEffect } from 'react';

/* Chakra UI */
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';

/* Libraries */
import { BsFolderFill } from "react-icons/bs";
import seqparse, { Seq } from "seqparse";

/* Application Modules */
import ProteinSequenceViewer from '../ProteinSequenceViewer/ProteinSequenceViewer';
import { setSeq, setAnnotation, setViewStyle, setName, setType } from '../../../../../../store/slices/seqViewSlice';
import useErrorToast from '../../../../../../hooks/useErrorToast';
import { useAppDispatch } from '../../../../../../store/store';

export interface OverviewProps {
  proteinPDBID?: string;
  projectTitle?: string;
  projectGoal?: string;
  pdbFileUrl?: string;
  measuredProperty?: string;
  proteinAminoAcidSequence?: string;
}

const ProteinViewer = (props: OverviewProps) => {
  const dispatch = useAppDispatch();
  const { handleOnError } = useErrorToast();
  const {
    proteinPDBID,
    pdbFileUrl,
    projectTitle,
    projectGoal,
    measuredProperty,
    proteinAminoAcidSequence
  } = props;

  const seqViewStyle = seqVizStyle(proteinPDBID);

  const parseSequenceAndUpdateSeqViewState = async () => {
    try {
      if (proteinAminoAcidSequence) {
        const parsedSeq: Seq = await seqparse(proteinAminoAcidSequence);
        let seqVizAnnotation;

        if (parsedSeq && parsedSeq.annotations.length > 0) {
          seqVizAnnotation = parsedSeq?.annotations;
        } else {
          seqVizAnnotation = [{
            name: String(parsedSeq.name),
            start: 0,
            end: Number(parsedSeq.seq.length),
            direction: 1,
            color: "#08355a"
          }]
        }

        dispatch(setSeq(parsedSeq.seq));
        dispatch(setName(parsedSeq.name));
        dispatch(setType(parsedSeq.type));
        dispatch(setAnnotation(seqVizAnnotation))
        dispatch(setViewStyle(seqViewStyle));
      }
    } catch (error: any) {
      handleOnError(error.message.split("url=")[0])
    }
  }

  useEffect(() => {
    parseSequenceAndUpdateSeqViewState();
  }, []);

  return (
    <Box marginTop="-2">
      <Stack spacing={3} marginBottom={1}>
        <Box display="flex" alignItems="center">
          <Box display="flex">
            <Text fontSize={20} fontWeight="bold" color="white">
              Project Title:
            </Text>

            <HStack ml={2} justify="space-between">
              <BsFolderFill size={20} color="white" />
              <span style={headingStyle}>{projectTitle}</span>
            </HStack>
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
        pdbFileUrl={pdbFileUrl}
        proteinPDBID={proteinPDBID}
        containerStyle={containerStyle}
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

const seqVizStyle = (proteinPDBID: string | undefined) => {
  return {
    height: proteinPDBID ? "18vw" : "43vw",
    width: "101.5%",
    padding: "10px 0",
    backgroundColor: "white",
    borderRadius: 10,
  };
}

export default ProteinViewer;
