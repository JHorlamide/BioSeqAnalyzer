/* React.js */
import React, { Fragment, useCallback, useState } from 'react';

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

const MemoizedZoomButtons = React.memo(ZoomButtons);
const MemoizedTopology = React.memo(Topology);
const MemoizedSettings = React.memo(Settings);
const MemoizedInformation = React.memo(Information);

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
  const [searchInput, setSearchInput] = useState("");
  const [zoomLevel, setZoomLevel] = useState(50);
  const [topology, setTopology] = useState<ViewerType>("both_flip");
  const [enzymes, setEnzymes] = useState(["PstI", "EcoRI", "XbaI", "SpeI"]);
  const [showIndex, setShowIndex] = useState(true);
  const [showComplete, setShowComplete] = useState(true);
  const { sequenceData, isLoading, info, refetch } = props;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }

  const handleZoomIn = useCallback(() => {
    if (zoomLevel < 100) {
      setZoomLevel(zoomLevel + 10);
    }
  }, [zoomLevel]);


  const handleZoomOut = useCallback(() => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 10);
    }
  }, [zoomLevel]);


  const toggleEnzyme = useCallback((enzyme: string) => {
    const myEnzymes = enzymes;

    if (myEnzymes.includes(enzyme)) {
      setEnzymes(myEnzymes.filter(enz => enz !== enzyme));
    } else {
      setEnzymes([...myEnzymes, enzyme]);
    }
  }, [enzymes]);

  const sequenceViewerStyle = {
    ...sequenceData.style,
    width: "100%",
    height: "48vw",
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

            {info ? <MemoizedInformation {...info} /> : (
              <Button
                color="white"
                bg="brand_blue.300"
                onClick={refetch}
                _hover={{ bg: "brand_blue.200" }}
              >
                <IoMdRefresh />
              </Button>
            )}

            <MemoizedZoomButtons
              handleZoomIn={handleZoomIn}
              handleZoomOut={handleZoomOut}
            />

            <MemoizedTopology onTopologyChange={setTopology} />

            <MemoizedSettings
              enzymes={enzymes}
              showIndex={showIndex}
              showComplete={showComplete}
              toggleEnzyme={toggleEnzyme}
              toggleShowIndex={setShowIndex}
              toggleShowComplete={setShowComplete}
            />
          </HStack>

          <Box width="full">
            <Input
              width={String(sequenceData.style?.searchInputWidth)}
              color="white"
              borderRadius="full"
              border="1px solid white"
              focusBorderColor="brand_blue.100"
              placeholder="Search bases, annotations, and primers"
              value={searchInput}
              onChange={handleSearchInputChange}
              _placeholder={{ fontSize: "15px", color: "white" }}
            />
          </Box>
        </Flex>
      </Box>

      {isLoading ? <AppLoader /> : (
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
            search={{ query: searchInput }}
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
