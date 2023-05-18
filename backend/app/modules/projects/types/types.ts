import { ObjectId } from "mongoose";
export enum ProjectGoal {
  MAXIMIZE = "Maximize",
  MINIMIZE = "Minimize"
}

export enum MeasuredProperty {
  ACTIVITY = "Activity",
  SOLUBILITY = "Solubility",
  THERMOSTABILITY = "Thermostability"
}

export interface IProject {
  user: ObjectId;
  projectTitle: string;
  measuredProperty: MeasuredProperty;
  projectGoal: ProjectGoal;

  //OPTIONAL PROPERTY
  proteinPDBID?: string;
  uniprotId?: string;
  proteinAminoAcidSequence?: string;
}

export interface IUpdateProject {
  projectId: string;
  projectData: IProject;
}

export interface IGetProjects {
  page: number;
  limit: number;
  search: string;
  userId: string;
}

export interface ProjectFields {
  sequence: string;
  fitness: string;
  muts: string;
}

export interface ProjectModel extends IProject {
  projectFile: Array<ProjectFields>;
}
