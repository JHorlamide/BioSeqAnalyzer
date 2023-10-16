/* React */
import { Fragment } from "react";

/* Chakra UI */
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

/* Application Module */
import ProjectCard from "./ProjectCard";
import { ProteinProjects } from "../../services/proteinProject/type";
import { DNASeqProjects } from "../../services/DNASequence/types";

interface Props {
  dnaSeqProjects?: DNASeqProjects[];
  proteinProjects?: ProteinProjects[];
  goToUpdateProjectPage: (projectId: string) => void;
  handleDeleteProject: (project: string) => void;
  goToProjectDetailsPage: (projectId: string) => void;
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
    proteinProjects,
    dnaSeqProjects,
    handleDeleteProject,
    goToUpdateProjectPage,
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
            <ProjectCard
              {...getProjectProperties(project)}
              handleDeleteProject={handleDeleteProject}
              goToUpdateProjectPage={goToUpdateProjectPage}
              goToProjectDetailsPage={goToProjectDetailsPage}
            />
          </GridItem>
        ))}
      </Grid>
    </Fragment>
  );
};

export default ProjectsListWithGridItem;
