import { CreateProjectFormField } from "../../schemas/DNASequence/DNASequenceProjectSchema";

export interface DNASeqProjects extends CreateProjectFormField {
  id: string;
  date_of_submission: string;
}

export interface ReqQueryParam {
  page: number;
  name: string;
  topology: number;
  nucleotideType: string;
}

export interface ICreateProject extends CreateProjectFormField {
  file?: File;
}

export interface IGetProjectsRes extends Response {
  count: number,
  next: string,
  previous: string,
  results: DNASeqProjects[]
}

export interface IGetProjectRes extends CreateProjectFormField {
  file: File;
};

export interface IGetProjectParam {
  projectId: string;
}

export interface IUpdateProjectReq extends CreateProjectFormField {
  projectId: string;
}