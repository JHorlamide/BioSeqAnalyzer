/* Libraries */
import { Box } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import useNavigation from "../../../../hooks/useNavigation";
import ProjectForm from "./ProjectForm";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useUpdateDNASeqProject } from "../../../../hooks/DNASequence/useCreateDNASeqProject";

const UpdateDNASeqProjectForm = () => {
  const { handleNavigate } = useNavigation();
  const { projectId } = useParams();
  const updateProjectHook = { projectId, ...useUpdateDNASeqProject(String(projectId)) };

  return (
    <Box width="full">
      <Button
        marginTop={-20}
        color="white"
        bg="brand_blue.300"
        _hover={{ bg: "brand_blue.200" }}
        leftIcon={<BsArrowLeft />}
        onClick={() => handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/dashboard`)}
      >
        Back
      </Button>

      <Box marginTop={-20}>
        <ProjectForm {...updateProjectHook} />
      </Box>
    </Box>
  );
}

export default UpdateDNASeqProjectForm;