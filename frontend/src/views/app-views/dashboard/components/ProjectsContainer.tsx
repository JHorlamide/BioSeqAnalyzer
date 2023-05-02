import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { Projects } from "../../../../services/project/type";
import ProjectCard from "../../../../components/ProjectCard/ProjectCard";

interface Props {
  projects: Projects[];
}

const ProjectsContainer = ({ projects }: Props) => {
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

export default ProjectsContainer;
