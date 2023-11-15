/* Libraries */
import { Box } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";

/* Application Modules */
import ProjectForm from "./ProjectForm";
import Button from "../../../../components/CustomBtn/Button";
import useNavigation from "../../../../hooks/useNavigation";
import { DNA_SEQ_ENTRY } from "../../../../config/AppConfig";
import { useUpdateDNASeqProject } from "../../../../hooks/DNASequence/useDnaSeqProjectHandler";

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
        onClick={() => handleNavigate(DNA_SEQ_ENTRY)}
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