/* Libraries */
import { Box } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import useNavigation from "../../../../hooks/useNavigation";
import ProjectForm from "./ProjectForm";
import { useCreateProteinProject } from "../../../../hooks/ProtienAnalyzer/useCreateProteinProject";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";

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
        onClick={() => handleNavigate(`${APP_PREFIX_PATH}/protein-analyzer/dashboard`)}
      >
        Back
      </Button>

      <ProjectForm {...useCreateProteinProject()} />
    </Box>
  );
};

export default CreateProject;
