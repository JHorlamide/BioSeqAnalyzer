/* React */
import { useState } from "react";

/* Libraries */
import { Box } from "@chakra-ui/react";

/* Application Modules */
import EmptyProject from "../../../../components/EmptyProject/EmptyProject";
import useNavigation from "../../../../hooks/useNavigation";
import ProjectsListWithGridItem from "../../../../components/Cards/ProjectsListWithGridItem";
import Pagination from "../../../../components/Pagination/Pagination";
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useAppSelector } from "../../../../store/store";
import { useGetProjectsQuery, useDeleteProjectMutation } from "../../../../services/proteinProject/proteinProjectAPI";
import useErrorToast from "../../../../hooks/useErrorToast";

const ProteinAnalyzerDashboard = () => {
  const searchTerm = useAppSelector((state) => state.search);
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;

  const [deleteProject] = useDeleteProjectMutation();
  const { data: projects, isLoading, refetch } = useGetProjectsQuery({
    page: currentPage,
    limit: totalPages,
    search: searchTerm
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const goToCreateProject = () => {
    handleNavigate(`${APP_PREFIX_PATH}/create-protein-project`);
  }

  const goToProjectDetailsPage = (projectId: string) => {
    handleNavigate(`${APP_PREFIX_PATH}/project-overview/${projectId}`)
  }

  async function handleDeleteProject(projectId: string) {
    try {
      const response = await deleteProject({ projectId }).unwrap();
      handleError(response.message);
    } catch (error: any) {
      handleError(error);
    }
  }

  if (!projects?.data.projects || projects?.data.projects.length === 0) {
    return <EmptyProject goToCreateProject={goToCreateProject}/>
  }

  return (
    <Box width="full">
      <DashboardHeader
        projectType="Protein"
        refetch={refetch}
        goToCreateProject={goToCreateProject}
      />

      <Box marginTop={5} width="full" height="full">
        <ProjectsListWithGridItem
          isLoading={isLoading}
          proteinProjects={projects.data.projects}
          handleDeleteProject={handleDeleteProject}
          goToProjectDetailsPage={goToProjectDetailsPage}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ProteinAnalyzerDashboard;
