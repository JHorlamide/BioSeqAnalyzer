import { IBaseResponse } from "../../../../schemas";
import { IProject } from "../../../../schemas/project.schema";

export interface ICreateProjectRes extends IBaseResponse {
  data: IProject;
}

export interface IGetProteinSequenceRes extends IBaseResponse {
  data: string;
}

export interface IGetProteinSequenceReq {
  uniprotId: string;
}

export interface Projects extends IProject {
  _id: string;
  updateAt: string;
}

export interface IFetchProjects extends IBaseResponse {
  data: Projects[];
}