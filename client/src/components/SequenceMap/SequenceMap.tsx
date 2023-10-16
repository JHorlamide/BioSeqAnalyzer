import { Fragment, useState } from 'react';

/* Chakra UI */
import { Box, HStack, Input } from '@chakra-ui/react';

/* Libraries */
import { SeqVizProps } from 'seqviz';
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';

/* Application Modules */
import SequenceViewer from "../SequenceViewer/SequenceViewer"
import Button from '../CustomBtn/Button';
import AppLoader from '../Loading/AppLoader';
import { ZoomButtons, Topology, Settings } from './SequenceMapSettings';

type ViewerType = "linear" | "circular" | "both" | "both_flip";

interface SequenceMapProps {
  sequenceData: SeqVizProps;
  isLoading: boolean;
}

const SequenceMap = (props: SequenceMapProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(50);
  const [topology, setTopology] = useState<ViewerType>("both_flip");
  const [enzymes, setEnzymes] = useState(["PstI", "EcoRI", "XbaI", "SpeI"]);
  const [showIndex, setShowIndex] = useState(true);
  const [showComplete, setShowComplete] = useState(true);
  const { sequenceData, isLoading } = props;

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const sequenceViewerStyle = {
    ...sequenceData.style,
    width: "100%",
    height: "48vw",
    marginTop: -6
  };

  return (
    <Fragment>
      <Box top={3} gap={2} display="flex" position="absolute">
        <HStack>
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

          <Input
            width={80}
            color="white"
            borderRadius="full"
            border="1px solid white"
            focusBorderColor="brand_blue.100"
            placeholder="Search bases, annotations, and primers"
            value={query}
            onChange={handleSearch}
            _placeholder={{ fontSize: "15px", color: "white" }}
          />
        </HStack>
      </Box>

      {isLoading ? (
        <AppLoader />
      ) : (
        <SequenceViewer
          name={sequenceData.name}
          seq={sequenceData.seq}
          annotations={sequenceData.annotations}
          viewer={topology}
          showIndex={showIndex}
          showComplement={showComplete}
          zoom={{ linear: zoomLevel }}
          enzymes={enzymes}
          search={{ query }}
          style={sequenceViewerStyle}
        />
      )}

    </Fragment>
  )
};

export default SequenceMap;
