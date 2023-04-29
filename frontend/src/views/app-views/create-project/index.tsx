import { Box } from "@chakra-ui/react";
import Button from "../../../components/CustomBtn/Button";
import { BsArrowLeft } from "react-icons/bs";
import { APP_PREFIX_PATH } from "../../../config/AppConfig";
import useNavigation from "../../../hooks/useNavigation";
import CreateProjectForm from "./components/CreateProjectForm";

const CreateProject = () => {
  const { handleNavigate } = useNavigation();

  return (
    <Box width="full">
      <Button
        leftIcon={<BsArrowLeft />}
        onClick={() => handleNavigate(`${APP_PREFIX_PATH}/dashboard`)}
      >
        Back
      </Button>

      <CreateProjectForm />
    </Box>
  );
};

export default CreateProject;
