/* Libraries */
import { Box } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import useNavigation from "../../../../hooks/useNavigation";
import ProjectForm from "./ProjectForm";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useUpdateProject } from "../../../../hooks/ProtienAnalyzer/useCreateProteinProject";

const UpdateProjectForm = () => {
  const { handleNavigate } = useNavigation();
  const { projectId } = useParams();
  const id = String(projectId);
  const updateProjectHook = { projectId, ...useUpdateProject(id) };

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

      <ProjectForm {...updateProjectHook} />
    </Box>
  );
}

export default UpdateProjectForm