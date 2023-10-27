/* React */
import { useMemo } from "react";

/* Libraries */
import { debounce } from "lodash";

/* Application Modules */
import useNavigation from "../../../../hooks/useNavigation";
import Pagination from "../../../../components/Pagination/Pagination";
import EmptyProject from "../../../../components/EmptyProject/EmptyProject";
import ProjectsListWithGridItem from "../../../../components/Cards/ProjectsListWithGridItem";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useDeleteProjectMutation, useGetAllProjectsQuery } from "../../../../services/DNASequence/DNASeqProjectAPI";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { clearFilterState, setCurrentPage, setName } from "../../../../store/slices/DNASeqFilter";

/* Chakra UI */
import { Box } from '@chakra-ui/react';
import ProjectCardSkeleton from "../../../../components/Cards/ProjectCardSkeleton";
import useErrorToast from "../../../../hooks/useErrorToast";

const DEBOUNCE_TIME_MS = 1000;
const TOTAL_PAGES = 10;
const searchInputStyle = {
  marginTop: -16,
  marginBottom: 5,
}

const DNASequenceDashboard = () => {
  const dispatch = useAppDispatch();
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const filters = useAppSelector((state) => state.DNASeqFilter);
  const [deleteProject] = useDeleteProjectMutation()
  const { data: projects, isLoading, refetch } = useGetAllProjectsQuery({
    name: filters.name,
    page: filters.currentPage,
    topology: filters.topology,
    nucleotideType: filters.nucleotideType,
  });

  const isProjectListEmpty = !projects?.results || projects?.results.length === 0;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    refetch();
  };

  const handleDataRefetch = () => {
    dispatch(clearFilterState());
    refetch();
  };

  const goToCreateProject = () => {
    handleNavigate(`${APP_PREFIX_PATH}/create-dna-project`);
  };

  const goToUpdateProjectPage = (projectId: string) => {
    handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/update/${projectId}`);
  };

  const goToProjectDetailsPage = (projectId: string) => {
    handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/overview/${projectId}`)
  };

  async function handleDeleteProject(projectId: string) {
    try {
      await deleteProject({ projectId }).unwrap();
    } catch (error: any) {
      handleError(error);
    }
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
        styleProps={searchInputStyle}
      />

      <DashboardHeader
        projectType="DNA"
        refetch={handleDataRefetch}
        goToCreateProject={goToCreateProject}
      />

      <Box marginTop={5} width="full" height="full">
        {isLoading ? <ProjectCardSkeleton /> : isProjectListEmpty ? (
          <EmptyProject
            projectType="DNA"
            goToCreateProject={goToCreateProject}
          />
        ) : (
          <ProjectsListWithGridItem
            handleDeleteProject={handleDeleteProject}
            dnaSeqProjects={projects.results}
            goToProjectDetailsPage={goToProjectDetailsPage}
            goToUpdateProjectPage={goToUpdateProjectPage}
          />
        )}
      </Box>

      <Pagination
        currentPage={filters.currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
      />
    </Box>
  )
}

export default DNASequenceDashboard