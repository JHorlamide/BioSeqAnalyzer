import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { Projects } from "../../../../services/project/type";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { Fragment } from "react";

interface Props {
  projects: Projects[];
  isLoading: boolean;
}

const ProjectsContainer = ({ projects, isLoading }: Props) => {
  const isLargeScreen = useMediaQuery("(min-width: 1440px)");
  const skeletons = Array(12).fill('skeleton');

  return (
    <Fragment>
      {isLoading &&
        <Grid gap={4}
          mt={3}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: isLargeScreen ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
          }}>

          {skeletons.map((skeleton) => <ProjectCardSkeleton key={skeleton} />)}
        </Grid>
      }

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
    </Fragment>
  );
};

export default ProjectsContainer;
