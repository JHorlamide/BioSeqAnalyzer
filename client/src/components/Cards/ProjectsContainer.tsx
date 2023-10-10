/* React */
import { Fragment } from "react";

/* Libraries/Packages */
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

/* Application Module */
import { Projects } from "../../services/proteinProject/type";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { DNASeqProjects } from "../../services/DNASequence/types";

interface Props {
  DNASeqProjects?: DNASeqProjects[];
  proteinProjects?: Projects[];
  isLoading: boolean;
}

const ProjectsContainer = ({ proteinProjects, DNASeqProjects, isLoading }: Props) => {
  const isLargeScreen = useMediaQuery("(min-width: 1440px)");
  const skeletons = Array(12).fill('skeleton');

  return (
    <Fragment>
      {isLoading &&
        <Grid
          gap={4}
          mt={3}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: isLargeScreen ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
          }}
        >
          {skeletons.map((skeleton) => <ProjectCardSkeleton key={skeleton} />)}
        </Grid>
      }

      <Grid
        gap={4}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: isLargeScreen ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
        }}
      >
        {proteinProjects && proteinProjects.map((project) => (
          <GridItem key={project._id}>
            <ProjectCard
              projectTitle={project.projectTitle}
              updatedAt={project.updatedAt}
              projectId={project._id}
              projectType="proteinProject"
            />
          </GridItem>
        ))}

        {DNASeqProjects && DNASeqProjects.map((project) => (
          <GridItem key={project.id}>
            <ProjectCard
              projectTitle={project.name}
              updatedAt={project.date_of_submission}
              projectId={project.id}
              projectType="DNASeqProject"
            />
          </GridItem>
        ))}
      </Grid>
    </Fragment>
  );
};

export default ProjectsContainer;
