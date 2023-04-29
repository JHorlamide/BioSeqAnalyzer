import { Box, Flex, Text } from "@chakra-ui/react";
import EmptyProject from "../../../components/EmptyProject/EmptyProject";
import Button from "../../../components/CustomBtn/Button";
import { APP_PREFIX_PATH } from "../../../config/AppConfig";
import useNavigation from "../../../hooks/useNavigation";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { useGetProjectsQuery } from "../../../store/slices/services/projectApiSlice";
import { Fragment } from "react";
import Loading from "../../../components/Loading/Loading";

const Dashboard = () => {
  const { handleNavigate } = useNavigation();
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

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
        {projects && projects.data.length > 0 ? (
          projects.data.map((project) => (
            <Fragment key={project._id}>
              <ProjectCard
                projectTitle={project.projectTitle}
                updatedAt={project.updateAt}
              />
            </Fragment>
          ))
        ) : (
          <EmptyProject />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
