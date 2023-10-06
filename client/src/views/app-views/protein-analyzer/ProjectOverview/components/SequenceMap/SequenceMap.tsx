import { useState } from 'react';

/* Chakra UI */
import { Box, HStack } from '@chakra-ui/react';

/* Libraries */
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';

/* Application Modules */
import SequenceViewer from "../../../../../../components/SequenceViewer/SequenceViewer"
import Button from '../../../../../../components/CustomBtn/Button';
import { useAppSelector } from "../../../../../../store/store";
import { ZoomButtons, Topology, Settings, SearchInput } from './ViewSettings';

type ViewerType = "linear" | "circular" | "both" | "both_flip";

interface Topology {
  title: string;
  value: ViewerType;
}

const SequenceMap = () => {
  const navigate = useNavigate();
  const sequenceData = useAppSelector((state) => state.seqView);
  const [viewerType, setViewerType] = useState<ViewerType>("both_flip");
  const [zoomLevel, setZoomLevel] = useState(50);
  const [enzymes, setEnzymes] = useState(["PstI", "EcoRI", "XbaI", "SpeI"]);
  const [showIndex, setShowIndex] = useState(true);
  const [showComplete, setShowComplete] = useState(true);
  const [query, setQuery] = useState("");

  const topologies: Topology[] = [
    { title: "Linear", value: "linear" },
    { title: "Circular", value: "circular" },
    { title: "Both", value: "both" },
    { title: "Both Flip", value: "both_flip" },
  ];

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

  return (
    <Box>
      <Box display="flex" position="absolute" top={5}>
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

          <Topology
            topologies={topologies}
            onTopologyChange={setViewerType}
          />

          <Settings
            enzymes={enzymes}
            showIndex={showIndex}
            showComplete={showComplete}
            toggleEnzyme={toggleEnzyme}
            toggleShowComplete={toggleShowComplete}
            toggleShowIndex={toggleShowIndex}
          />

          <SearchInput searchQuery={query} setSearchQuery={setQuery} />
        </HStack>
      </Box>

      <SequenceViewer
        name={sequenceData.name}
        seq={sequenceData.seq}
        annotations={sequenceData.annotations}
        viewer={viewerType}
        style={{ ...sequenceData.style, width: "100%", height: "48vw" }}
        showIndex={showIndex}
        showComplement={showComplete}
        zoom={{ linear: zoomLevel }}
        enzymes={enzymes}
        search={{ query }}
      />
    </Box>
  )
};

export default SequenceMap;
