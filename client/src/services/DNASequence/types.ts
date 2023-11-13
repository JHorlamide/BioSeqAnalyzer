import { NucleotideType, TopologyType } from "../../schemas/DNASequenceProjectSchema";

export interface DNASeqProject {
  id: string;
  name?: string;
  bases?: string;
  description?: string;
  sequence_id?: string;
  topology: TopologyType;
  nucleotide_type: NucleotideType;
  file: string;
  file_content: string;
  sequence: string;
  date_of_submission: string;
}

export interface ICreateDNASeqProjectsRes {
  status: string;
  message: string;
  data: DNASeqProject;
}

export type ReqQueryParam = Pick<DNASeqProject, "topology" | "nucleotide_type"> & {
  page: number;
  name: string;
}

export type ICreateProject = Pick<DNASeqProject,
  "name" |
  "bases" |
  "description" |
  "sequence_id" |
  "topology" |
  "nucleotide_type"
>

export interface IGetProjectsRes extends Response {
  count: number;
  next: string;
  previous: string;
  results: DNASeqProject[];
}

export interface IGetProjectRes {
  status: string;
  message: string;
  data: DNASeqProject
};

export interface IGetProjectParam {
  projectId: string;
}

export interface IGetSequenceDataReq {
  sequence_id: string;
}

export type IUpdateProjectReq = Pick<DNASeqProject,
  "name" |
  "bases" |
  "sequence_id" |
  "topology" |
  "nucleotide_type"
> & {
  projectId: string;
}

export interface InviteReq {
  user_id: string;
  project_id: string;
}

export interface InviteRes extends IGetProjectRes { }
