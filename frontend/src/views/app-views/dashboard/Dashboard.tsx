import { Fragment, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import EmptyProject from "../../../components/EmptyProject/EmptyProject";
import Button from "../../../components/CustomBtn/Button";
import { APP_PREFIX_PATH } from "../../../config/AppConfig";
import useNavigation from "../../../hooks/useNavigation";
import ProjectsContainer from "./components/ProjectsContainer";
import { useGetProjectsQuery } from "../../../services/project/projectApi";
import Pagination from "../../../components/Pagination/Pagination";
import { useAppSelector } from "../../../store/store";
import { GiMolecule } from "react-icons/gi";

const Dashboard = () => {
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
    handleNavigate(`${APP_PREFIX_PATH}/create-project`);
  }

  return (
    <Box width="full">
      <Flex justify="space-between">
        <Text fontWeight="medium" fontSize="24px" color="white">
          Projects
        </Text>

        {/* Only show when there is more than one project created */}
        <Button
          color="white"
          bg="brand_blue.300"
          _hover={{ bg: "brand_blue.200" }}
          leftIcon={<GiMolecule size={20} />}
          onClick={createProjectPage}
        >
          Create new project
        </Button>
      </Flex>

      <Box marginTop={5} width="full" height="full">
        {projects && projects.data.projects.length > 0 ? (
          <Fragment>
            <ProjectsContainer
              projects={projects.data.projects}
              isLoading={isLoading}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Fragment>
        ) : (
          <EmptyProject />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
