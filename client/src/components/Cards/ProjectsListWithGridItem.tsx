/* React */
import { Fragment } from "react";

/* Libraries/Packages */
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

/* Application Module */
import { ProteinProjects } from "../../services/proteinProject/type";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { DNASeqProjects } from "../../services/DNASequence/types";

interface Props {
  isLoading: boolean;
  dnaSeqProjects?: DNASeqProjects[];
  proteinProjects?: ProteinProjects[];
  goToProjectDetailsPage: (projectId: string) => void;
  handleDeleteProject: (project: string) => void;
}

const getGridTemplateColumns = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1440px)");

  return {
    base: "repeat(1, 1fr)",
    md: "repeat(2, 1fr)",
    lg: isLargeScreen ? "repeat(4, 1fr)" : "repeat(2, 1fr)"
  }
}

const ProjectsListWithGridItem = (props: Props) => {
  const {
    isLoading,
    proteinProjects,
    dnaSeqProjects,
    handleDeleteProject,
    goToProjectDetailsPage
  } = props;

  const projects = [...(proteinProjects ?? []), ...(dnaSeqProjects ?? [])];

  const getProjectProperties = (project: DNASeqProjects | ProteinProjects) => {
    if (isDNASeqProject(project)) {
      const { id, name, date_of_submission } = project as DNASeqProjects;

      return {
        projectId: id,
        projectTitle: name,
        updatedAt: date_of_submission
      };
    }

    const { _id, projectTitle, updatedAt } = project as ProteinProjects;
    return { projectTitle, updatedAt, projectId: _id };
  };

  const isDNASeqProject = (project: DNASeqProjects | ProteinProjects): boolean => {
    return (project as DNASeqProjects).id !== undefined;
  };

  return (
    <Fragment>
      <Grid gap={4} templateColumns={getGridTemplateColumns()}>
        {projects.map((project) => (
          <GridItem key={getProjectProperties(project).projectId}>
            {isLoading ? (
              <ProjectCardSkeleton />
            ) : (
              <ProjectCard
                {...getProjectProperties(project)}
                handleDeleteProject={handleDeleteProject}
                goToProjectDetailsPage={goToProjectDetailsPage}
              />
            )}
          </GridItem>
        ))}
      </Grid>
    </Fragment>
  );
};

export default ProjectsListWithGridItem;
