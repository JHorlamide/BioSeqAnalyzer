import { CreateProjectFormField } from "../../schemas/DNASequenceProjectSchema";

// export interface ICreateDNASeqProjectsRes {
//   status: string;
//   message: string;
//   data: CreateProjectFormField & {
//     id: string;
//     date_of_submission: string;
//   }
// }

export interface ICreateDNASeqProjectsRes {
  status: string;
  message: string;
  data: CreateProjectFormField & {
    id: string;
    date_of_submission: string;
  }
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
  results: {
    id: string;
    name: string;
    bases?: string,
    description?: string,
    sequence_id?: string,
    date_of_submission: string;
    nucleotide_type: string,
    topology: string,
    sequence?: string;
  }[]
}

export interface IGetProjectRes {
  status: string;
  message: string;
  data: CreateProjectFormField & {
    file: string;
    file_content: string;
    sequence: string;
    date_of_submission: string;
  }
};

export interface IGetProjectParam {
  projectId: string;
}

export interface IGetSequenceDataReq {
  sequence_id: string;
}

export interface IUpdateProjectReq extends CreateProjectFormField {
  projectId: string;
}