import { IBaseResponse } from "../../schemas";
import { IProject, ProjectFormData } from "../../schemas/project.schema";

export interface ProjectFields {
  sequence: string;
  fitness: string;
  muts: string;
}

export interface Projects extends IProject {
  _id: string;
  user: string;
  projectFile: ProjectFields[]
  pdbFileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProjectRes extends IBaseResponse {
  data: IProject;
}

export interface IGetProteinSequenceRes extends IBaseResponse {
  data: string;
}

export interface IGetProteinSequenceReq {
  uniprotId: string | undefined;
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

export interface IGetProjectReq {
  projectId: string | undefined;
}

export interface IGetProjectRes extends IBaseResponse {
  data: Projects;
}

export interface IUpdateProjectReq {
  projectId: string;
  data: ProjectFormData;
}

export interface IUpdateProjectRes extends IBaseResponse {
  data: IProject;
}

export interface IUploadProjectFileReq {
  data: FormData;
  projectId: string;
}

export interface IUploadProjectRes extends IBaseResponse {
  data: Projects
}

export interface IGetProteinDataReq {
  projectId: string;
}

export interface IGetProteinDataRes {
  data: any;
}

export interface IDeleteProject {
  projectId: string;
}

export interface IDeleteProjectRes extends IBaseResponse { };