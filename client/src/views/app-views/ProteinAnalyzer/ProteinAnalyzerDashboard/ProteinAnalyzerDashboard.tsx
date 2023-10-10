/* React */
import { useState } from "react";

/* Libraries */
import { Box } from "@chakra-ui/react";

/* Application Modules */
import EmptyProject from "../../../../components/EmptyProject/EmptyProject";
import useNavigation from "../../../../hooks/useNavigation";
import ProjectsContainer from "../../../../components/Cards/ProjectsContainer";
import Pagination from "../../../../components/Pagination/Pagination";
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useAppSelector } from "../../../../store/store";
import { useGetProjectsQuery } from "../../../../services/proteinProject/proteinProjectAPI";

const ProteinAnalyzerDashboard = () => {
  const searchTerm = useAppSelector((state) => state.search);
  const { handleNavigate } = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;

  const { data: projects, isLoading, refetch } = useGetProjectsQuery({
    page: currentPage,
    limit: totalPages,
    search: searchTerm
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const createProjectPage = () => {
    handleNavigate(`${APP_PREFIX_PATH}/create-protein-project`);
  }

  if (!projects?.data.projects || projects?.data.projects.length === 0) {
    return <EmptyProject />
  }

  return (
    <Box width="full">
      <DashboardHeader
        projectType="Protein"
        refetch={refetch}
        createProjectAction={createProjectPage}
      />

      <Box marginTop={5} width="full" height="full">
        <ProjectsContainer
          proteinProjects={projects.data.projects}
          isLoading={isLoading}
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
