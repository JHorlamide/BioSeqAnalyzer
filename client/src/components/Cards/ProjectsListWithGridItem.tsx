/* React */
import { Fragment } from "react";

/* Chakra UI */
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

/* Application Module */
import ProjectCard from "./ProjectCard";
import { DNASeqProject } from "../../services/DNASequence/types";
import { ProteinProjectData } from "../../services/proteinProject/type";

interface Props {
  projectType: string
  loadingStates: { [key: string]: boolean };
  dnaSeqProjects?: DNASeqProject[];
  proteinProjects?: ProteinProjectData[];
  handleProjectDelete: (projectId: string) => void;
  goToUpdateProjectPage: (projectId: string) => void;
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
    loadingStates,
    handleProjectDelete,
    goToUpdateProjectPage,
    goToProjectDetailsPage
  } = props;

  const projects = [...(proteinProjects ?? []), ...(dnaSeqProjects ?? [])];

  const getProjectProperties = (project: DNASeqProject | ProteinProjectData) => {
    if (isDNASeqProject(project)) {
      const { id, name, date_of_submission } = project as DNASeqProject;

      return {
        projectId: id,
        projectTitle: String(name),
        updatedAt: date_of_submission,
      };
    }

    const { _id, projectTitle, updatedAt } = project as ProteinProjectData;
    return { projectTitle, updatedAt, projectId: _id };
  };

  const isDNASeqProject = (project: DNASeqProject | ProteinProjectData): boolean => {
    return (project as DNASeqProject).id !== undefined;
  };

  return (
    <Fragment>
      <Grid gap={4} templateColumns={getGridTemplateColumns()}>
        {projects.map((project) => (
          <GridItem key={getProjectProperties(project).projectId}>
            <ProjectCard
              projectType={projectType}
              {...getProjectProperties(project)}
              handleDeleteProject={handleProjectDelete}
              goToUpdateProjectPage={goToUpdateProjectPage}
              goToProjectDetailsPage={goToProjectDetailsPage}
              loading={loadingStates[getProjectProperties(project).projectId] || false}
            />
          </GridItem>
        ))}
      </Grid>
    </Fragment>
  );
};

export default ProjectsListWithGridItem;
