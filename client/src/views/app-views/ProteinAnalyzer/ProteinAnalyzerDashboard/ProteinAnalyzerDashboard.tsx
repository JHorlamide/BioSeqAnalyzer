/* React */
import { useMemo } from "react";

/* Libraries */
import { debounce } from "lodash";

/* Chakra UI */
import { Box } from "@chakra-ui/react";

/* Application Modules */
import useNavigation from "../../../../hooks/useNavigation";
import useErrorToast from "../../../../hooks/useErrorToast";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import EmptyProject from "../../../../components/EmptyProject/EmptyProject";
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import ProjectsListWithGridItem from "../../../../components/Cards/ProjectsListWithGridItem";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useGetProjectsQuery, useDeleteProjectMutation } from "../../../../services/proteinProject/proteinProjectAPI";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { clearFilterState, setSearQuery, setCurrentPage } from "../../../../store/slices/proteinAnalyzerFilter";

const DEBOUNCE_TIME_MS = 1000;
const TOTAL_PAGES = 10;

const ProteinAnalyzerDashboard = () => {
  const dispatch = useAppDispatch();
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [deleteProject] = useDeleteProjectMutation();
  const filters = useAppSelector((state) => state.proteinAnalyzerFilter);

  const { data: projects, isLoading, refetch } = useGetProjectsQuery({
    page: filters.currentPage,
    limit: TOTAL_PAGES,
    projectTitle: filters.searchQuery,
    projectGoal: filters.projectGoal,
    measuredProperty: filters.measuredProperty,
  });

  const isProjectListEmpty = !projects?.data.projects ||
    projects?.data.projects.length === 0;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    refetch();
  };

  const handleDataRefetch = () => {
    dispatch(clearFilterState());
    refetch();
  }

  const goToCreateProject = () => {
    handleNavigate(`${APP_PREFIX_PATH}/create-protein-project`);
  }

  const goToUpdateProjectPage = (projectId: string) => {
    handleNavigate(`${APP_PREFIX_PATH}/protein-project/update/${projectId}`)
  }
  
  const goToProjectDetailsPage = (projectId: string) => {
    handleNavigate(`${APP_PREFIX_PATH}/protein-project/overview/${projectId}`)
  }

  async function handleDeleteProject(projectId: string) {
    try {
      await deleteProject({ projectId }).unwrap();
    } catch (error: any) {
      handleError(error);
    }
  }

  const handleSearchQuery = useMemo(() =>
    debounce(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearQuery(value));
    }, DEBOUNCE_TIME_MS),
    []);

  const searchInputStyles = {
    marginTop: -16,
    marginBottom: 5,
  };

  return (
    <Box width="full">
      <SearchInput
        handleSearchQuery={handleSearchQuery}
        styleProps={searchInputStyles}
      />

      <DashboardHeader
        projectType="Protein"
        refetch={handleDataRefetch}
        goToCreateProject={goToCreateProject}
      />

      <Box marginTop={5} width="full" height="full">
        {isProjectListEmpty ? (
          <EmptyProject projectType="Protein" goToCreateProject={goToCreateProject} />
        ) : (
          <ProjectsListWithGridItem
            isLoading={isLoading}
            proteinProjects={projects.data.projects}
            handleDeleteProject={handleDeleteProject}
            goToUpdateProjectPage={goToUpdateProjectPage}
            goToProjectDetailsPage={goToProjectDetailsPage}
          />
        )}

        <Pagination
          currentPage={filters.currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ProteinAnalyzerDashboard;
