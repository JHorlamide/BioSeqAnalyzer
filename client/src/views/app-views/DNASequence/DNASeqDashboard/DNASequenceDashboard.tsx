/* Application Modules */
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useGetAllProjectsQuery } from "../../../../services/DNASequence/DNASeqProjectAPI";
import { useAppSelector } from "../../../../store/store";
import useNavigation from "../../../../hooks/useNavigation";
import ProjectsContainer from "../../../../components/Cards/ProjectsContainer";
import EmptyProject from "../../../../components/EmptyProject/EmptyProject";

/* Chakra UI */
import { Box } from '@chakra-ui/react';

const DNASequenceDashboard = () => {
  const searchQuery = useAppSelector((state) => state.search)
  const { handleNavigate } = useNavigation();

  const createProjectPage = () => {
    handleNavigate(`${APP_PREFIX_PATH}/create-dna-project`)
  };

  const { data: projects, isLoading, refetch } = useGetAllProjectsQuery({
    name: searchQuery,
    description: searchQuery,
  });

  if (!projects?.results || projects?.results.length === 0) {
    return <EmptyProject />
  }

  return (
    <Box width="full">
      <DashboardHeader
        projectType="DNA"
        refetch={refetch}
        createProjectAction={createProjectPage}
      />

      <Box marginTop={5} width="full" height="full">
        <ProjectsContainer
          DNASeqProjects={projects.results}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  )
}

export default DNASequenceDashboard