/* Chakra UI */
import { Flex, HStack, Text } from "@chakra-ui/react";

/* Libraries */
import { GiMolecule } from "react-icons/gi";
import { TbDna2 } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";

/* Application Modules */
import Button from "../CustomBtn/Button";

type ProjectType = "DNA" | "Protein";

interface IProps {
  projectType: ProjectType;
  refetch: () => void;
  createProjectAction: () => void;
}

const DashboardHeader = ({ projectType, refetch, createProjectAction }: IProps) => {
  const buttonIcon = {
    "DNA": <TbDna2 size={20} />,
    "Protein": <GiMolecule size={20} />,
  }

  return (
    <Flex justify="space-between">
      <HStack spacing={3}>
        <Text
          color="white"
          fontWeight="medium"
          fontSize={{ base: "20px", md: "24px" }}
          whiteSpace="nowrap"
        >
          {projectType} Projects
        </Text>

        <Button
          color="white"
          bg="brand_blue.300"
          onClick={refetch}
          leftIcon={<IoMdRefresh size={20} />}
          _hover={{ bg: "brand_blue.200" }}
        >
          Refresh
        </Button>
      </HStack>

      <Button
        color="white"
        bg="brand_blue.300"
        leftIcon={buttonIcon[projectType]}
        onClick={createProjectAction}
        _hover={{ bg: "brand_blue.200" }}
      >
        Create new project
      </Button>
    </Flex>
  )
}

export default DashboardHeader