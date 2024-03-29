/* React */
import { Fragment, Suspense, useEffect, useState } from 'react';

/* Libraries */
import { Link, useParams, useSearchParams } from 'react-router-dom';

/* Application Modules */
import Utils from '../../../../utils';
import useParseSeq from "../../../../hooks/useParseSeq";
import Footer from "../../../../components/Footer/Footer";
import useErrorToast from '../../../../hooks/useErrorToast';
import Button from '../../../../components/CustomBtn/Button';
import AppLoader from '../../../../components/Loading/AppLoader';
import SequenceMap from '../../../../components/SequenceMap/SequenceMap';
import { AUTH_PREFIX_PATH, API_BASE_URL } from '../../../../config/AppConfig';
import { DNASeqProject } from '../../../../services/DNASequence/types';

/* Chakra UI */
import {
  Box,
  Flex,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

interface ProjectDetailsRes {
  status: string;
  message: string;
  detail?: string;
  data: DNASeqProject
}

const seqVizStyle = {
  height: "43vw",
  width: "101.5%",
  padding: "10px 0",
  borderRadius: 10,
  backgroundColor: "white",
  searchInputWidth: "650px"
}

const SharedProjectView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleError } = useErrorToast();
  const [pathQuery] = useSearchParams();
  const { projectId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState<DNASeqProject>();

  const { bases, file_content, sequence } = projectDetails || {};
  const { seqVizData, loading: seqVizLoading } = useParseSeq(file_content || sequence || null);

  const sequenceData = bases !== null ?
    { ...seqVizData, style: seqVizStyle, seq: bases } :
    { ...seqVizData, style: seqVizStyle }

  const info = {
    name: projectDetails?.name,
    nucleotide_type: projectDetails?.nucleotide_type === "D" ? "DNA" : "RNA",
    topology: projectDetails?.topology === "L" ? "Linear" : "Circular",
    created: Utils.formattedDate(projectDetails?.date_of_submission)
  }

  const message = String(pathQuery.get("message"));

  const fetchProjectDetails = async () => {
    const reqURL = `${API_BASE_URL}/project/share/${projectId}`;

    try {
      setLoading(true);
      const response = await fetch(reqURL);
      const data: ProjectDetailsRes = await response.json();
      const { status, message, detail, data: resData } = data;

      if (status && status === "Success") {
        setProjectDetails(resData);
        setLoading(false);
        return;
      }

      if (detail && detail !== undefined) {
        setLoading(false);
        return handleError(`Server error: ${detail}`);
      }

      handleError(message);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const openMessageModal = () => {
    if (message && message !== "null") {
      return onOpen();
    }

    onClose();
  }

  useEffect(() => {
    openMessageModal();
    fetchProjectDetails();
  }, [projectId]);

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent color="white" bg="brand_blue.300">
          <ModalHeader>Welcome to BioSeqAnalyzer!</ModalHeader>
          <ModalCloseButton />
          <Divider />

          <ModalBody>
            <Text marginTop={4}>{message}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              bg="brand_blue.200"
              onClick={onClose}
              _hover={{ bg: "brand_blue.200" }}
            >
              Open
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex
        bg="brand_blue.50"
        height={{ base: "100vh", md: "100vh" }}
        width={{ base: "full", md: "full" }}
      >
        <Flex color="white" position="absolute" right={10} top={6} gap={6}>
          <Link to={`${AUTH_PREFIX_PATH}/register`}>Sign Up</Link>
          <Link to={`${AUTH_PREFIX_PATH}/login`}>Sign In</Link>
        </Flex>

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
    </Fragment>
  )
}

export default SharedProjectView