import { useState, SetStateAction, Dispatch } from 'react';

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
  Button as ChakraButton
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
  onTopologyChange: Dispatch<SetStateAction<ViewerType>>;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

interface Topology {
  title: string;
  value: ViewerType;
}

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
        borderColor="brand_blue.200"
        as={ChakraButton}
        _hover={{
          cursor: "pointer",
        }}
        leftIcon={<TbTopologyRing size={20} />}
        onClick={(e) => e.stopPropagation()}
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

export const Settings = () => {
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
        borderColor="brand_blue.200"
        as={ChakraButton}
        _hover={{
          cursor: "pointer",
        }}
        leftIcon={<FiSettings size={20} />}
        onClick={(e) => e.stopPropagation()}
      >
        Settings
      </MenuButton>

      <MenuList bg="brand_blue.300">
        <MenuItem
          display="flex"
          _hover={{ bg: "brand_blue.100" }}
        >
          <Text marginLeft={3}>Show Index</Text>
        </MenuItem>

        <MenuItem
          display="flex"
          _hover={{ bg: "brand_blue.100" }}
        >
          <Text marginLeft={3}>Show Complete</Text>
        </MenuItem>

        <MenuItem
          display="flex"
          _hover={{ bg: "brand_blue.100" }}
        >
          <Text marginLeft={3}>Custom Children</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const ViewSettings = (props: ViewSettingsProps) => {
  const { onTopologyChange, handleZoomIn, handleZoomOut } = props;
  const navigate = useNavigate();

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

  return (
    <Box display="flex" position="absolute" top={5}>
      <HStack>
        <Button
          color="white"
          bg="brand_blue.300"
          leftIcon={<BsArrowLeft />}
          onClick={() => navigate(-1)}
          marginRight={60}
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
          color="brand_blue.200"
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
        <Settings />
      </HStack>
    </Box>
  )
}

export default ViewSettings