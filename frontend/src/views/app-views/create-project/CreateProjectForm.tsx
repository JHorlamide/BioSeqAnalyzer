import { Box } from "@chakra-ui/react";
import Button from "../../../components/CustomBtn/Button";
import { BsArrowLeft } from "react-icons/bs";
import { APP_PREFIX_PATH } from "../../../config/AppConfig";
import useNavigation from "../../../hooks/useNavigation";
import ProjectForm from "./components/ProjectForm";
import { useProject } from "../../../hooks/useProject";

const CreateProject = () => {
  const { handleNavigate } = useNavigation();

  return (
    <Box width="full">
      <Button
        marginTop={-20}
        color="white"
        bg="brand_blue.300"
        _hover={{ bg: "brand_blue.200" }}
        leftIcon={<BsArrowLeft />}
        onClick={() => handleNavigate(`${APP_PREFIX_PATH}/dashboard`)}
      >
        Back
      </Button>

      <ProjectForm {...useProject()} />
    </Box>
  );
};

export default CreateProject;
