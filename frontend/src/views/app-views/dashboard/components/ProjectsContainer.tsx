import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { Projects } from "../../../../services/project/type";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

interface Props {
  projects: Projects[];
  isLoading: boolean;
}

const ProjectsContainer = ({ projects, isLoading }: Props) => {
  const isLargeScreen = useMediaQuery("(min-width: 1440px)");

  console.log({ isLoading });
  
  return (
    <Grid
      gap={4}
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: isLargeScreen ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
      }}
    >
      {projects.map((project) => (
        <GridItem key={project._id}>
          <ProjectCard
            projectTitle={project.projectTitle}
            updatedAt={project.updatedAt}
            projectId={project._id}
            projectName={project.projectTitle}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default ProjectsContainer;
