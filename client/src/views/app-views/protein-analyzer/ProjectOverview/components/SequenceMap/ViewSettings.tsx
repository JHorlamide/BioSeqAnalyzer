import { SetStateAction, Dispatch } from 'react';

/* Chakra UI */
import {
  Box,
  ButtonGroup,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Switch,
  Button as ChakraButton,
  Input
} from '@chakra-ui/react';

/* Libraries */
import { BsZoomIn, BsZoomOut, BsArrowLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi"
import { TbTopologyRing } from "react-icons/tb";

/* Application Modules */
import Button from '../../../../../../components/CustomBtn/Button';

type ViewerType = "linear" | "circular" | "both" | "both_flip";

interface ViewSettingsProps {
  searchQuery: string;
  showIndex: boolean;
  showComplete: boolean;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  toggleShowIndex: () => void;
  toggleShowComplete: () => void;
  onTopologyChange: Dispatch<SetStateAction<ViewerType>>;
}

interface Topology {
  title: string;
  value: ViewerType;
}

type SettingsProps = Pick<ViewSettingsProps, "toggleShowComplete" | "toggleShowIndex" | "showComplete" | "showIndex">;

export const Topology = (
  { onTopologyChange }: { onTopologyChange: Dispatch<SetStateAction<ViewerType>>; }
) => {
  const topologies: Topology[] = [
    { title: "Linear", value: "linear" },
    { title: "Circular", value: "circular" },
    { title: "Both", value: "both" },
    { title: "Both Flip", value: "both_flip" },
  ];

  return (
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
  )
}

export const Settings = (props: SettingsProps) => {
  const { toggleShowComplete, toggleShowIndex, showComplete, showIndex } = props;

  const configs = [
    {
      isChecked: showIndex,
      title: "Show Index",
      action: () => toggleShowIndex()
    },

    {
      isChecked: showComplete,
      title: "Show Complete",
      action: () => toggleShowComplete()
    }
  ]

  const enzymes = [
    { title: "PstI", value: "psti" },
    { title: "EcoRI", value: "ecori" },
    { title: "XbaI", value: "xbal" },
    { title: "SpeI", value: "spel" },
  ]

  return (
    <Menu colorScheme='green'>
      <MenuButton
        display="flex"
        bg="brand_blue.300"
        rounded="full"
        paddingY={1.5}
        paddingX={3}
        color="white"
        borderRadius={30}
        whiteSpace="nowrap"
        borderColor="brand_blue.200"
        as={ChakraButton}
        leftIcon={<FiSettings size={20} />}
        onClick={(e) => e.stopPropagation()}
        _hover={{
          cursor: "pointer",
        }}
      >
        Settings
      </MenuButton>

      <MenuList bg="brand_blue.300">
        {configs.map(({ action, title, isChecked }) => (
          <MenuItem
            key={title}
            bg="brand_blue.300"
            color="white"
            onClick={action}
          >
            <Switch
              id="show-index"
              size="md"
              colorScheme="gray"
              isChecked={isChecked}
            />
            <Text marginLeft={2} marginRight={5}>{title}</Text>
          </MenuItem>
        ))}

        <Text
          color="white"
          textAlign="center"
          bg="brand_blue.50"
          marginTop={3}
          borderRadius={20}
        >
          Enzyme
        </Text>

        {enzymes.map(({ title, value }) => (
          <MenuItem
            key={title}
            bg="brand_blue.300"
            color="white"
            _hover={{ bg: "brand_blue.200" }}
          >
            <Text marginLeft={2} marginRight={5}>{title}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

const ViewSettings = (props: ViewSettingsProps) => {
  const navigate = useNavigate();
  const {
    searchQuery,
    showIndex,
    showComplete,
    setSearchQuery,
    onTopologyChange,
    handleZoomIn,
    handleZoomOut,
    toggleShowComplete,
    toggleShowIndex
  } = props;

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
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  return (
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

        <ButtonGroup
          isAttached
          variant='outline'
          paddingY={2}
          paddingX={3}
          spacing={6}
          borderRadius={30}
          color="brand_blue.100"
        >
          <Button
            bg="brand_blue.300"
            rightIcon={<BsZoomOut {...zoomIconStyle} />}
            _hover={{ bg: "brand_blue.300" }}
            onClick={() => handleZoomOut()}
          />

          <Button
            bg="brand_blue.300"
            rightIcon={<BsZoomIn {...zoomIconStyle} />}
            _hover={{ bg: "brand_blue.300" }}
            onClick={() => handleZoomIn()}
          />
        </ButtonGroup>

        {/* Topology */}
        <Topology onTopologyChange={onTopologyChange} />

        {/* Settings */}
        <Settings
          showIndex={showIndex}
          showComplete={showComplete}
          toggleShowComplete={toggleShowComplete}
          toggleShowIndex={toggleShowIndex}
        />

        <Input
          _placeholder={{ fontSize: "15px", color: "white" }}
          color="white"
          border="1px solid white"
          focusBorderColor="brand_blue.100"
          borderRadius="full"
          placeholder="Search bases, annotations, and primers"
          width={80}
          value={searchQuery}
          onChange={handleSearch}
        />
      </HStack>
    </Box>
  )
}

export default ViewSettings