/* React.js */
import { Fragment, useRef, useState } from 'react';

/* Chakra UI */
import { Box, Flex, HStack, Input } from '@chakra-ui/react';

/* Libraries */
import { SeqVizProps } from 'seqviz';
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import { IoMdRefresh } from "react-icons/io";

/* Application Modules */
import SequenceViewer from "../SequenceViewer/SequenceViewer"
import Button from '../CustomBtn/Button';
import AppLoader from '../Loading/AppLoader';
import { ZoomButtons, Topology, Settings, Information } from './SequenceMapSettings';
import useErrorToast from '../../hooks/useErrorToast';

type ViewerType = "linear" | "circular" | "both" | "both_flip";

interface SequenceMapProps {
  sequenceData: SeqVizProps;
  isLoading: boolean;
  refetch?: () => void;
  info?: {
    name?: string;
    topology?: string;
    created?: string;
    nucleotide_type?: string;
  }
}

const SequenceMap = (props: SequenceMapProps) => {
  const navigate = useNavigate();
  const { handleError } = useErrorToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [topology, setTopology] = useState<ViewerType>("both_flip");
  const [enzymes, setEnzymes] = useState(["PstI", "EcoRI", "XbaI", "SpeI"]);
  const [showIndex, setShowIndex] = useState(true);
  const [showComplete, setShowComplete] = useState(true);
  const { sequenceData, isLoading, info, refetch } = props;

  const handleZoomIn = () => {
    if (zoomLevel < 100) {
      setZoomLevel(zoomLevel + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  const toggleShowIndex = () => {
    setShowIndex(!showIndex);
  };

  const toggleShowComplete = () => {
    setShowComplete(!showComplete);
  };

  const toggleEnzyme = (enzyme: string) => {
    const myEnzymes = enzymes;

    if (myEnzymes.includes(enzyme)) {
      setEnzymes(myEnzymes.filter(enz => enz !== enzyme));
    } else {
      setEnzymes([...myEnzymes, enzyme]);
    }
  };

  const sequenceViewerStyle = {
    ...sequenceData.style,
    width: "100%",
    height: "48vw",
    marginTop: -6
  };

  return (
    <Fragment>
      <Box top={3} display="flex" position="absolute">
        <Flex width="full" alignItems="center" gap={2}>
          <HStack width="full">
            <Button
              color="white"
              bg="brand_blue.300"
              leftIcon={<BsArrowLeft />}
              onClick={() => navigate(-1)}
              marginRight={0}
              _hover={{ bg: "brand_blue.200" }}
            >
              Back
            </Button>

            {info ? (<Information {...info} />) : (
              <Button
                color="white"
                bg="brand_blue.300"
                onClick={refetch}
                _hover={{ bg: "brand_blue.200" }}
              >
                <IoMdRefresh />
              </Button>
            )}

            <ZoomButtons
              handleZoomIn={handleZoomIn}
              handleZoomOut={handleZoomOut}
            />

            <Topology onTopologyChange={setTopology} />

            <Settings
              enzymes={enzymes}
              showIndex={showIndex}
              showComplete={showComplete}
              toggleEnzyme={toggleEnzyme}
              toggleShowComplete={toggleShowComplete}
              toggleShowIndex={toggleShowIndex}
            />
          </HStack>

          <Box width="140%">
            <Input
              width="lg"
              color="white"
              borderRadius="full"
              border="1px solid white"
              focusBorderColor="brand_blue.100"
              placeholder="Search bases, annotations, and primers"
              ref={searchInputRef}
              _placeholder={{ fontSize: "15px", color: "white" }}
            />
          </Box>
        </Flex>
      </Box>

      {isLoading ? (<AppLoader />) : (
        <Fragment>
          <SequenceViewer
            name={sequenceData.name}
            seq={sequenceData.seq}
            annotations={sequenceData.annotations}
            viewer={topology}
            showIndex={showIndex}
            showComplement={showComplete}
            zoom={{ linear: zoomLevel }}
            enzymes={enzymes}
            search={{ query: String(searchInputRef.current?.value) }}
            style={sequenceViewerStyle}
          />

          {sequenceData && sequenceData.seq === undefined && (
            <Box
              color="white"
              textAlign="center"
              verticalAlign="center"
              marginTop={60}
              fontSize={20}
            >
              Unable to render sequence map. Please make sure you have access to the internet
            </Box>
          )}
        </Fragment>
      )}
    </Fragment>
  )
};

export default SequenceMap;
