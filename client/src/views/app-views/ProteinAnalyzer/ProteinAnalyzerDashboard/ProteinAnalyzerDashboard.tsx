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

  const {
    currentPage,
    searchQuery,
    projectGoal,
    measuredProperty,
  } = useAppSelector((state) => state.proteinAnalyzerFilter);

  const { data: projects, isLoading, refetch } = useGetProjectsQuery({
    page: currentPage,
    limit: TOTAL_PAGES,
    projectTitle: searchQuery,
    projectGoal,
    measuredProperty,
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

  const goToProjectDetailsPage = (projectId: string) => {
    handleNavigate(`${APP_PREFIX_PATH}/project-overview/${projectId}`)
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
            goToProjectDetailsPage={goToProjectDetailsPage}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ProteinAnalyzerDashboard;
