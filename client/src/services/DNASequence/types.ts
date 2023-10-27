import { CreateProjectFormField } from "../../schemas/DNASequence/DNASequenceProjectSchema";

// export interface ICreateDNASeqProjectsRes {
//   status: string;
//   message: string;
//   data: CreateProjectFormField & {
//     id: string;
//     date_of_submission: string;
//   }
// }

export interface ICreateDNASeqProjectsRes extends CreateProjectFormField {
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
  file: string;
}

export interface IGetProjectsRes extends Response {
  count: number,
  next: string,
  previous: string,
  results: ICreateDNASeqProjectsRes[]
}

export interface IGetProjectRes extends CreateProjectFormField {
  file: string;
  file_content: string;
};

export interface IGetProjectParam {
  projectId: string;
}

export interface IUpdateProjectReq extends CreateProjectFormField {
  projectId: string;
}