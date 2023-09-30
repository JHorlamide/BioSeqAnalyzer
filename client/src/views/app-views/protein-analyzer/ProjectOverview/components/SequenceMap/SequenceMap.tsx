import { useState } from 'react';

/* Chakra UI */
import { Box } from '@chakra-ui/react';

/* Application Modules */
import SequenceViewer from "../../../../../../components/SequenceViewer/SequenceViewer"
import ViewSettings from "./ViewSettings";
import { useAppSelector } from "../../../../../../store/store";

type ViewerType = "linear" | "circular" | "both" | "both_flip";

const SequenceMap = () => {
  const [viewerType, setViewerType] = useState<ViewerType>("both_flip");
  const [zoomLevel, setZoomLevel] = useState(50);
  const sequenceData = useAppSelector((state) => state.seqView);

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

  return (
    <Box>
      <ViewSettings
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        onTopologyChange={setViewerType}
      />

      <SequenceViewer
        name={sequenceData.name}
        seq={sequenceData.seq}
        annotations={sequenceData.annotations}
        viewer={viewerType}
        style={{ ...sequenceData.style, width: "100%", height: "48vw" }}
        showIndex={true}
        showComplement={true}
        zoom={{ linear: zoomLevel }}
      />
    </Box>
  )
};

export default SequenceMap;
