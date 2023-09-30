/* Chakra UI */
import { Flex, Text } from "@chakra-ui/react";

/* Libraries */
import { GiMolecule } from "react-icons/gi";
import { TbDna2 } from "react-icons/tb";

/* Application Modules */
import Button from "../CustomBtn/Button";

type ProjectType = "DNA" | "Protein";

interface IProps {
  projectType: ProjectType;
  createProjectAction: () => void;
}

const DashboardHeader = ({ projectType, createProjectAction }: IProps) => {
  const buttonIcon = {
    "DNA": <TbDna2 size={20} />,
    "Protein": <GiMolecule size={20} />,
  }

  return (
    <Flex justify="space-between">
      <Text
        fontWeight="medium"
        fontSize={{ base: "20px", md: "24px" }}
        color="white"
        whiteSpace="nowrap"
      >
        {projectType} Projects
      </Text>

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