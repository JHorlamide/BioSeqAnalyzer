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

  proteinPDBID?: string;
  pdbFileUrl?: string;
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

export interface S3UploadRes {
  fileName: string;
  Bucket: string;
  Key: string;
}

export interface ProjectModel extends IProject {
  projectFile: S3UploadRes;
}
