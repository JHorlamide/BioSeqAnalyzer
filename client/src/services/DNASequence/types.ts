import { CreateProjectFormField } from "../../schemas/DNASequence/DNASequenceProjectSchema";

export interface DNASeqProjects extends CreateProjectFormField {
  id: number;
  date_of_submission: string;
}

export interface CreateDNAProjectRes extends Response {
  data: CreateProjectFormField;
}

export interface IGetProjectsRes extends Response {
  count: number,
  next: string,
  previous: string,
  results: DNASeqProjects[]
}

export interface ReqQueryParam {
  name?: string;
  bases?: number;
  topology?: number;
  description?: string;
  nucleotide_type?: string;
  date_of_submission?: string;
}