/* React */
import { Suspense, useEffect, useState } from 'react';

/* Libraries */
import { useParams, useSearchParams } from 'react-router-dom';

/* Application Modules */
import Utils from '../../../../utils';
import useErrorToast from '../../../../hooks/useErrorToast';
import SequenceMap from '../../../../components/SequenceMap/SequenceMap';
import useParseSeq from "../../../../hooks/useParseSeq";
import { AUTHENTICATED_ENTRY, AUTH_PREFIX_PATH, BASE_URL } from '../../../../config/AppConfig';
import AppLoader from '../../../../components/Loading/AppLoader';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import Button from '../../../../components/CustomBtn/Button';
import useNavigation from '../../../../hooks/useNavigation';
import Footer from "../../../../components/Footer/Footer";

interface ProjectDetails {
  id: string;
  name: string;
  bases: string | null;
  description: string | null;
  sequence_id: string | null;
  date_of_submission: string;
  nucleotide_type: string;
  topology: string;
  sequence: string;
  file: string;
  file_content: string;
}

const seqVizStyle = {
  height: "43vw",
  width: "101.5%",
  padding: "10px 0",
  borderRadius: 10,
  backgroundColor: "white",
}

const SharedProjectView = () => {
  const { handleNavigate } = useNavigation();
  const { handleError } = useErrorToast();
  const [pathQuery] = useSearchParams();
  const { projectId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    id: "",
    name: "",
    bases: "",
    description: "",
    sequence_id: "",
    date_of_submission: "",
    nucleotide_type: "D",
    topology: "L",
    sequence: "",
    file: "",
    file_content: "",
  });

  const message = pathQuery.get("message");
  const { bases, file_content, sequence, name, nucleotide_type, topology, date_of_submission } = projectDetails || {};
  const { seqVizData, loading: seqVizLoading } = useParseSeq(file_content || sequence || null);

  const sequenceData = bases !== null ?
    { ...seqVizData, style: seqVizStyle, seq: bases } :
    { ...seqVizData, style: seqVizStyle }

  const info = {
    name,
    nucleotide_type: nucleotide_type === "D" ? "DNA" : "RNA",
    topology: topology === "L" ? "Linear" : "Circular",
    created: Utils.formattedDate(date_of_submission)
  }

  const fetchProjectDetails = async () => {
    const reqURL = `${BASE_URL}/project/share/${projectId}`;

    try {
      setLoading(true);
      const response = await fetch(reqURL);
      const data = await response.json();
      const { status, message, detail } = data 

      if (status && status === "Success") {
        setProjectDetails(data.data);
        setLoading(false);
        return;
      }

      if (detail && detail !== undefined) {
        setLoading(false);
        return handleError("Server error. Please try again later")
      }

      setLoading(false);
      handleError(message);
    } catch (error: any) {
      setLoading(false);
      handleError(error.message);
    }
  }

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId])

  return (
    <Flex
      bg="brand_blue.50"
      height={{ base: "100vh", md: "100vh" }}
      width={{ base: "full", md: "full" }}
    >
      <Box
        paddingY={{ md: 4, base: 5 }}
        paddingX={{ md: 4, base: 3 }}
        width={{ base: "100vw", md: "100%" }}
        overflow="auto"
        marginTop={14}
      >
        <Suspense fallback={<AppLoader />}>
          <SequenceMap
            info={info}
            isLoading={isLoading || seqVizLoading}
            sequenceData={sequenceData}
          />
        </Suspense>
        <Footer />
      </Box>
    </Flex>
  )
}

export default SharedProjectView