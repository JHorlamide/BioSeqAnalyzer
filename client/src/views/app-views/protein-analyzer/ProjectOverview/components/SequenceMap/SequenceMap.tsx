import { useState } from 'react';

/* Chakra UI */
import { Box } from '@chakra-ui/react';

/* Application Modules */
import SequenceViewer from "../../../../../../components/SequenceViewer/SequenceViewer"
import ViewSettings from "./ViewSettings";
import { useAppSelector } from "../../../../../../store/store";

type ViewerType = "linear" | "circular" | "both" | "both_flip";

const SequenceMap = () => {
  const sequenceData = useAppSelector((state) => state.seqView);

  const [viewerType, setViewerType] = useState<ViewerType>("both_flip");
  const [zoomLevel, setZoomLevel] = useState(50);
  const [enzymes, setEnzymes] = useState(["PstI", "EcoRI", "XbaI", "SpeI"]);
  const [showIndex, setShowIndex] = useState(true);
  const [showComplete, setShowComplete] = useState(true);
  const [query, setQuery] = useState("");

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

  return (
    <Box>
      <ViewSettings
        searchQuery={query}
        setSearchQuery={setQuery}
        showIndex={showIndex}
        showComplete={showComplete}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        onTopologyChange={setViewerType}
        toggleShowIndex={toggleShowIndex}
        toggleShowComplete={toggleShowComplete}
      />

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
