/* Chakra UI */
import {
  Box,
  Text,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

/* Libraries */
import { CiFilter } from "react-icons/ci";
import { useAppDispatch } from "../../store/store";
import { setNucleotideType, setTopology } from "../../store/slices/DNASeqFilter";

const nucleotideOpt = [
  {
    title: "DNA",
    value: "D"
  },
  {
    title: "RNA",
    value: "R"
  },
]

const TopologyOpt = [
  {
    title: "Linear",
    value: "L"
  },
  {
    title: "Circular",
    value: "C"
  },
  {
    title: "Both",
    value: "B"
  },
  {
    title: "Both Flip",
    value: "B_F"
  },
];

const DNASeqFilter = () => {
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" gap={2}>
      {/* Nucleotide Filter */}
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
          leftIcon={<CiFilter size={20} />}
          onClick={(e) => e.stopPropagation()}
          _hover={{
            cursor: "pointer",
          }}
        >
          Nucleotide
        </MenuButton>

        <MenuList bg="brand_blue.300">
          {nucleotideOpt.map((option) => (
            <MenuItem
              key={option.value}
              bg="brand_blue.300"
              color="white"
              onClick={() => dispatch(setNucleotideType(option.value))}
              _hover={{ bg: "brand_blue.100" }}
            >
              <Text marginLeft={3}>{option.title}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Topology Filter */}
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
          leftIcon={<CiFilter size={20} />}
          onClick={(e) => e.stopPropagation()}
          _hover={{
            cursor: "pointer",
          }}
        >
          Topology
        </MenuButton>

        <MenuList bg="brand_blue.300">
          {TopologyOpt.map((option) => (
            <MenuItem
              key={option.value}
              bg="brand_blue.300"
              color="white"
              onClick={() => dispatch(setTopology(option.value))}
              _hover={{ bg: "brand_blue.100" }}
            >
              <Text marginLeft={3}>{option.title}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default DNASeqFilter