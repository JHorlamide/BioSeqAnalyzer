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
  user: String;
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

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SearchParams {
  userId: string;
  projectTitle: string;
  projectGoal: string;
  measuredProperty: string;
};

export interface S3UploadRes {
  fileName: string;
  Bucket: string;
  Key: string;
}

export interface ProjectModel extends IProject {
  projectFileName: string;
}

export interface CSVColumnDataType {
  sequence: string;
  fitness: number;
  muts: string;
}

export interface IMutationRange {
  mutation: string;
  scoreRange: { min: number; max: number }
}

export type QueryType = { user: string; $or?: Array<Record<string, { $regex: string; $options: string }>> };