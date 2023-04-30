import { Box, Flex, Grid, GridItem, Text, useMediaQuery } from "@chakra-ui/react";
import EmptyProject from "../../../components/EmptyProject/EmptyProject";
import Button from "../../../components/CustomBtn/Button";
import { APP_PREFIX_PATH } from "../../../config/AppConfig";
import useNavigation from "../../../hooks/useNavigation";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { useGetProjectsQuery } from "../../../store/slices/services/projectApiSlice";
import { Projects } from "../../../schemas/project.schema";

interface ProjectsContainerProps {
  projects: Projects[];
}

const ProjectsContainer = ({ projects }: ProjectsContainerProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1440px)");
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: isLargeScreen ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
      }}
      gap={4}
    >
      {projects.map((project) => (
        <GridItem key={project._id}>
          <ProjectCard
            projectTitle={project.projectTitle}
            updatedAt={project.updateAt}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

const Dashboard = () => {
  const { handleNavigate } = useNavigation();
  const { data: projects } = useGetProjectsQuery();

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
          <ProjectsContainer projects={projects.data} />
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
