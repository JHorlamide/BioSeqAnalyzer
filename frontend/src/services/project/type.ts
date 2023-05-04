import { IBaseResponse } from "../../schemas";
import { IProject } from "../../schemas/project.schema";

export interface ICreateProjectRes extends IBaseResponse {
  data: IProject;
}

export interface IGetProteinSequenceRes extends IBaseResponse {
  data: string;
}

export interface IGetProteinSequenceReq {
  uniprotId: string | undefined;
}

export interface Projects extends IProject {
  _id: string;
  user: string;
  createdAt: string;
  updateAt: string;
}

export interface IGetProjectsRes extends IBaseResponse {
  data: {
    projects: Projects[]
  };
  totalPages: number;
  totalCount: number;
}

export interface IGetProjectQueryParam {
  page?: number;
  limit?: number;
  search?: string;
}