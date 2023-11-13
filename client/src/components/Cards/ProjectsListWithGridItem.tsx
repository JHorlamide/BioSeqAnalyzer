/* React */
import { Fragment } from "react";

/* Chakra UI */
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

/* Application Module */
import ProjectCard from "./ProjectCard";
import { ProteinProjects } from "../../services/proteinProject/type";
import { DNASeqProject } from "../../services/DNASequence/types";

interface Props {
  projectType: string
  dnaSeqProjects?: DNASeqProject[];
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
    projectType,
    dnaSeqProjects,
    proteinProjects,
    handleDeleteProject,
    goToUpdateProjectPage,
    goToProjectDetailsPage
  } = props;
  const projects = [...(proteinProjects ?? []), ...(dnaSeqProjects ?? [])];

  const getProjectProperties = (project: DNASeqProject | ProteinProjects) => {
    if (isDNASeqProject(project)) {
      const { id, name, date_of_submission } = project as DNASeqProject;

      return {
        projectId: id,
        projectTitle: String(name),
        updatedAt: date_of_submission,
      };
    }

    const { _id, projectTitle, updatedAt } = project as ProteinProjects;
    return { projectTitle, updatedAt, projectId: _id };
  };

  const isDNASeqProject = (project: DNASeqProject | ProteinProjects): boolean => {
    return (project as DNASeqProject).id !== undefined;
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
              projectType={projectType}
            />
          </GridItem>
        ))}
      </Grid>
    </Fragment>
  );
};

export default ProjectsListWithGridItem;
