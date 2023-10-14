/* Chakra UI */
import {
  Text,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";

/* Libraries */
import { CiFilter } from "react-icons/ci";
import { setProjectGoal, setMeasuredProperty } from "../../store/slices/proteinAnalyzerFilter";
import { useAppDispatch } from "../../store/store";

const projectGoalsOpt = [
  {
    title: "Maximize",
    value: "Maximize"
  },
  {
    title: "Minimize",
    value: "Minimize"
  },
]

const measuredPropertyOpt = [
  {
    title: "Activity",
    value: "Activity"
  },
  {
    title: "Solubility",
    value: "Solubility"
  },
  {
    title: "Thermostability",
    value: "Thermostability"
  },
]

const ProteinAnalyzerFilter = () => {
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" gap={4}>
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
          Project goal
        </MenuButton>

        <MenuList bg="brand_blue.300">
          {projectGoalsOpt.map((option) => (
            <MenuItem
              key={option.value}
              bg="brand_blue.300"
              color="white"
              onClick={() => dispatch(setProjectGoal(option.value))}
              _hover={{ bg: "brand_blue.100" }}
            >
              <Text marginLeft={3}>{option.title}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

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
          Measured property
        </MenuButton>

        <MenuList bg="brand_blue.300">
          {measuredPropertyOpt.map((option) => (
            <MenuItem
              key={option.value}
              bg="brand_blue.300"
              color="white"
              onClick={() => dispatch(setMeasuredProperty(option.value))}
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

export default ProteinAnalyzerFilter