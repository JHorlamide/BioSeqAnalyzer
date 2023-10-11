/* Application Modules */
import useErrorToast from "../../../../hooks/useErrorToast";
import useNavigation from "../../../../hooks/useNavigation";
import EmptyProject from "../../../../components/EmptyProject/EmptyProject";
import ProjectsListWithGridItem from "../../../../components/Cards/ProjectsListWithGridItem";
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useAppSelector } from "../../../../store/store";
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "../../../../services/DNASequence/DNASeqProjectAPI";

/* Chakra UI */
import { Box } from '@chakra-ui/react';

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
  };

  async function handleDeleteProject(projectId: string) {
    try {
      await deleteProject({ projectId }).unwrap();
    } catch (error: any) {
      handleError(error);
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