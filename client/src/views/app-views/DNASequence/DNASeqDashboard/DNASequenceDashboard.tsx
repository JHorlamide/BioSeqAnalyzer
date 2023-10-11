/* Application Modules */
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "../../../../services/DNASequence/DNASeqProjectAPI";
import { useAppSelector } from "../../../../store/store";
import useNavigation from "../../../../hooks/useNavigation";
import ProjectsListWithGridItem from "../../../../components/Cards/ProjectsListWithGridItem";
import EmptyProject from "../../../../components/EmptyProject/EmptyProject";
import useErrorToast from "../../../../hooks/useErrorToast";

/* Chakra UI */
import { Box } from '@chakra-ui/react';
import Utils from "../../../../utils";

const DNASequenceDashboard = () => {
  const searchQuery = useAppSelector((state) => state.search)
  const { handleNavigate } = useNavigation();
  const { handleError } = useErrorToast();
  const [deleteProject] = useDeleteProjectMutation();

  const { data: projects, isLoading, refetch } = useGetAllProjectsQuery({
    name: searchQuery,
    description: searchQuery,
  });

  const goToCreateProject = () => {
    handleNavigate(`${APP_PREFIX_PATH}/create-dna-project`)
  };

  const goToProjectDetailsPage = (projectId: string) => {
    handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/${projectId}`)
  }

  async function handleDeleteProject(projectId: string) {
    try {
      const response = await deleteProject({ projectId }).unwrap();
      console.log({ response })
    } catch (error) {
      const errorMessage = Utils.getErrorMessage(error);
      handleError(errorMessage);
    }
  }

  if (!projects?.results || projects?.results.length === 0) {
    return <EmptyProject goToCreateProject={goToCreateProject} />
  }

  return (
    <Box width="full">
      <DashboardHeader
        projectType="DNA"
        refetch={refetch}
        goToCreateProject={goToCreateProject}
      />

      <Box marginTop={5} width="full" height="full">
        <ProjectsListWithGridItem
          isLoading={isLoading}
          dnaSeqProjects={projects.results}
          handleDeleteProject={handleDeleteProject}
          goToProjectDetailsPage={goToProjectDetailsPage}
        />
      </Box>
    </Box>
  )
}

export default DNASequenceDashboard