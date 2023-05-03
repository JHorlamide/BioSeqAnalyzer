import { Box, Flex, Text } from "@chakra-ui/react";
import EmptyProject from "../../../components/EmptyProject/EmptyProject";
import Button from "../../../components/CustomBtn/Button";
import { APP_PREFIX_PATH } from "../../../config/AppConfig";
import useNavigation from "../../../hooks/useNavigation";
import ProjectsContainer from "./components/ProjectsContainer";
import useFetchProject from "../../../hooks/useFetchProjects";
import AppLoader from "../../../components/Loading/AppLoader";
import { useGetProjectsQuery } from "../../../services/project/projectApi";

const Dashboard = () => {
  const { handleNavigate } = useNavigation();
  // const { projects, isLoading } = useFetchProject();
  const { data: projects, isLoading } = useGetProjectsQuery();

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <Box width="full">
      <Flex justify="space-between">
        <Text fontWeight="medium" fontSize="24px">
          Projects
        </Text>

        {/* Only show when there is more than one project created */}
        <Button
          onClick={() => handleNavigate(`${APP_PREFIX_PATH}/create-project`)}
        >
          Create new project
        </Button>
      </Flex>

      <Box marginY={10}>
        {projects && projects?.data.length > 0 ? (
          <ProjectsContainer projects={projects?.data} />
        ) : (
          <EmptyProject />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

{
  /* <Fragment key={project._id}>
  <ProjectCard
    projectTitle={project.projectTitle}
    updatedAt={project.updateAt}
  />
</Fragment>; */
}
