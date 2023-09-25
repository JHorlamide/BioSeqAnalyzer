/* Libraries */
import { Flex, Text } from "@chakra-ui/react";
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
      <Text fontWeight="medium" fontSize="24px" color="white">
        {projectType} Projects
      </Text>

      {/* Only show when there is more than one project created */}
      <Button
        color="white"
        bg="brand_blue.300"
        _hover={{ bg: "brand_blue.200" }}
        leftIcon={buttonIcon[projectType]}
        onClick={createProjectAction}
      >
        Create new project
      </Button>
    </Flex>
  )
}

export default DashboardHeader