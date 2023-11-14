/* React */
import { SetStateAction, Dispatch } from 'react';

import { HiOutlineInformationCircle } from "react-icons/hi";

/* Libraries */
import { FiSettings } from "react-icons/fi";
import { TbTopologyRing } from "react-icons/tb";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

/* Application Modules */
import utils from '../../utils';
import Button from '../CustomBtn/Button';

/* Chakra UI */
import {
  Box,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Switch,
  Button as ChakraButton,
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Flex,
} from '@chakra-ui/react';

type ViewerType = "linear" | "circular" | "both" | "both_flip";

interface Topology {
  title: string;
  value: ViewerType;
}

const topologies: Topology[] = [
  { title: "Linear", value: "linear" },
  { title: "Circular", value: "circular" },
  { title: "Both", value: "both" },
  { title: "Both Flip", value: "both_flip" },
];

interface InfoProps {
  name?: string;
  topology?: string;
  created?: string;
  nucleotide_type?: string;
}

interface ZoomButtonProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

interface TopologyProps {
  onTopologyChange: Dispatch<SetStateAction<ViewerType>>;
}

interface SettingsProps {
  showComplete: boolean;
  showIndex: boolean;
  enzymes: string[];
  toggleEnzyme: (enzyme: string) => void;
  toggleShowComplete: React.Dispatch<React.SetStateAction<boolean>>;
  toggleShowIndex: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ZoomButtons = (props: ZoomButtonProps) => {
  const { handleZoomIn, handleZoomOut } = props;

  const zoomIconStyle = {
    color: "white",
    size: 30,
    style: {
      padding: "3px 2px",
      cursor: "pointer",
      hover: {
        backgroundColor: "none"
      }
    }
  };

  return (
    <ButtonGroup
      isAttached
      variant='outline'
      paddingY={2}
      paddingX={2}
      spacing={6}
      borderRadius={30}
      color="brand_blue.100"
    >
      <Button
        bg="brand_blue.300"
        rightIcon={<BsZoomOut {...zoomIconStyle} />}
        onClick={() => handleZoomOut()}
        _hover={{ bg: "brand_blue.200" }}
      />

      <Button
        bg="brand_blue.300"
        rightIcon={<BsZoomIn {...zoomIconStyle} />}
        _hover={{ bg: "brand_blue.200" }}
        onClick={() => handleZoomIn()}
      />
    </ButtonGroup>
  )
}

export const Information = (props: InfoProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          color="white"
          bg="brand_blue.300"
          _hover={{ bg: "brand_blue.200" }}
        >
          <HiOutlineInformationCircle size={20} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        top={14}
        color="white"
        bg="brand_blue.300"
        position="relative"
      >
        <PopoverArrow />
        <PopoverHeader>SEQUENCE INFO</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {Object.keys(props).map((key, index) => (
            <Flex key={index} justifyContent="space-between">
              <Text>{utils.capitalizeText(key)}</Text>
              <Text>{props[key as keyof InfoProps]}</Text>
            </Flex>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export const Topology = (props: TopologyProps) => {
  const { onTopologyChange } = props;

  return (
    <Box>
      <Menu>
        <MenuButton
          display="flex"
          bg="brand_blue.300"
          rounded="full"
          paddingY={1.5}
          paddingX={3}
          color="white"
          borderRadius={30}
          whiteSpace="nowrap"
          borderColor="red"
          as={ChakraButton}
          leftIcon={<TbTopologyRing size={20} />}
          onClick={(e) => e.stopPropagation()}
          _hover={{
            cursor: "pointer",
            bg: "brand_blue.200"
          }}
        >
          Topology
        </MenuButton>

        <MenuList bg="brand_blue.300">
          {topologies.map((topology) => (
            <MenuItem
              key={topology.value}
              bg="brand_blue.300"
              color="white"
              onClick={() => onTopologyChange(topology.value)}
              _hover={{ bg: "brand_blue.100" }}
            >
              <Text marginLeft={3}>{topology.title}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export const Settings = (props: SettingsProps) => {
  const {
    enzymes,
    showIndex,
    showComplete,
    toggleEnzyme,
    toggleShowComplete,
    toggleShowIndex
  } = props;

  const settings = [
    {
      isChecked: showIndex,
      title: "Show Index",
      action: () => toggleShowIndex(!showIndex)
    },

    {
      isChecked: showComplete,
      title: "Show Complete",
      action: () => toggleShowComplete(!showComplete)
    }
  ];

  return (
    <Box>
      <Menu>
        <MenuButton
          display="flex"
          color="white"
          bg="brand_blue.300"
          rounded="full"
          paddingY={1.5}
          paddingX={3}
          borderRadius={30}
          whiteSpace="nowrap"
          as={ChakraButton}
          leftIcon={<FiSettings size={20} />}
          onClick={(e) => e.stopPropagation()}
          _hover={{
            cursor: "pointer",
            bg: "brand_blue.200"
          }}
        >
          Settings
        </MenuButton>

        <MenuList bg="brand_blue.300">
          {settings.map(({ action, title, isChecked }) => (
            <MenuItem
              key={title}
              bg="brand_blue.300"
              color="white"
              onClick={action}
            >
              <Switch
                size="md"
                id="show-index"
                colorScheme="gray"
                isChecked={isChecked}
              />
              <Text marginLeft={2} marginRight={5}>{title}</Text>
            </MenuItem>
          ))}

          <Box marginTop={2} paddingX={2}>
            <Text
              color="white"
              textAlign="center"
              bg="brand_blue.50"
              marginTop={3}
              borderRadius={20}
            >
              Enzyme
            </Text>

            <Grid
              templateColumns='repeat(2, 1fr)'
              gap={2}
              display="flex"
              marginTop={2}
            >
              <GridItem width="100%">
                <Button
                  isActive={enzymes.includes("PstI")}
                  border={0}
                  paddingY={1}
                  paddingX={4}
                  borderRadius={4}
                  color={enzymes.includes("PstI") ? "brand_blue.300" : "white"}
                  colorScheme={enzymes.includes("PstI") ? "gray" : ""}
                  onClick={() => toggleEnzyme("PstI")}
                >
                  PstI
                </Button>
              </GridItem>

              <GridItem width="100%">
                <Button
                  isActive={enzymes.includes("EcoRI")}
                  border={0}
                  paddingY={1}
                  paddingX={4}
                  borderRadius={4}
                  color={enzymes.includes("EcoRI") ? "brand_blue.300" : "white"}
                  colorScheme={enzymes.includes("EcoRI") ? "gray" : ""}
                  onClick={() => toggleEnzyme("EcoRI")}
                >
                  EcoRI
                </Button>
              </GridItem>

              <GridItem width="100%">
                <Button
                  isActive={enzymes.includes("XbaI")}
                  border={0}
                  paddingY={1}
                  paddingX={4}
                  borderRadius={4}
                  color={enzymes.includes("XbaI") ? "brand_blue.300" : "white"}
                  colorScheme={enzymes.includes("XbaI") ? "gray" : ""}
                  onClick={() => toggleEnzyme("XbaI")}
                >
                  XbaI
                </Button>
              </GridItem>

              <GridItem width="100%">
                <Button
                  isActive={enzymes.includes("SpeI")}
                  border={0}
                  paddingY={1}
                  paddingX={4}
                  borderRadius={4}
                  color={enzymes.includes("SpeI") ? "brand_blue.300" : "white"}
                  colorScheme={enzymes.includes("SpeI") ? "gray" : ""}
                  onClick={() => toggleEnzyme("SpeI")}
                >
                  SpeI
                </Button>
              </GridItem>
            </Grid>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  )
}
