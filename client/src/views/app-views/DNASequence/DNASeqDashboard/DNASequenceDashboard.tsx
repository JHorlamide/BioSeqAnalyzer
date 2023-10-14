/* React */
import { useMemo } from "react";

/* Libraries */
import { debounce } from "lodash";

/* Application Modules */
import useErrorToast from "../../../../hooks/useErrorToast";
import useNavigation from "../../../../hooks/useNavigation";
import EmptyProject from "../../../../components/EmptyProject/EmptyProject";
import ProjectsListWithGridItem from "../../../../components/Cards/ProjectsListWithGridItem";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "../../../../services/DNASequence/DNASeqProjectAPI";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { clearFilterState, setCurrentPage, setName } from "../../../../store/slices/DNASeqFilter";

/* Chakra UI */
import { Box } from '@chakra-ui/react';
import Pagination from "../../../../components/Pagination/Pagination";


const DEBOUNCE_TIME_MS = 1000;
const TOTAL_PAGES = 10;

const DNASequenceDashboard = () => {
  const dispatch = useAppDispatch();
  const { handleNavigate } = useNavigation();
  const { handleError } = useErrorToast();
  const [deleteProject] = useDeleteProjectMutation();

  const {
    name,
    topology,
    nucleotideType,
    currentPage,
  } = useAppSelector((state) => state.DNASeqFilter);

  const { data: projects, isLoading, refetch } = useGetAllProjectsQuery({
    name,
    page: currentPage,
    topology,
    nucleotideType,
  });

  const isProjectListEmpty = !projects?.results || projects?.results.length === 0;

  const goToCreateProject = () => {
    handleNavigate(`${APP_PREFIX_PATH}/create-dna-project`)
  };

  const goToProjectDetailsPage = (projectId: string) => {
    handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/${projectId}`)
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    refetch();
  };

  async function handleDeleteProject(projectId: string) {
    try {
      await deleteProject({ projectId }).unwrap();
    } catch (error: any) {
      handleError(error);
    }
  }

  const handleDataRefetch = () => {
    dispatch(clearFilterState());
    refetch();
  }

  const handleSearchQuery = useMemo(() =>
    debounce(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setName(value));
    }, DEBOUNCE_TIME_MS),
    []);

  return (
    <Box width="full">
      <SearchInput
        handleSearchQuery={handleSearchQuery}
        styleProps={{
          marginTop: -16,
          marginBottom: 5,
        }}
      />

      <DashboardHeader
        projectType="DNA"
        refetch={handleDataRefetch}
        goToCreateProject={goToCreateProject}
      />

      {isProjectListEmpty ? (
        <EmptyProject projectType="DNA" goToCreateProject={goToCreateProject} />
      ) : (
        <Box marginTop={5} width="full" height="full">
          <ProjectsListWithGridItem
            isLoading={isLoading}
            dnaSeqProjects={projects.results}
            handleDeleteProject={handleDeleteProject}
            goToProjectDetailsPage={goToProjectDetailsPage}
          />
        </Box>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
      />
    </Box>
  )
}

export default DNASequenceDashboard