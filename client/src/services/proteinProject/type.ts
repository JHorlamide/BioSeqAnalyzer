import { IBaseResponse } from "../../schemas";
import { IProject, ProjectFormData } from "../../schemas/proteinAnalyzer/proteinProjectSchema";

export interface ProteinProjects extends IProject {
  _id: string;
  user: string;
  projectFileName: string;
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
  uniprotId: string;
}

export interface IGetProjectsRes extends IBaseResponse {
  data: { projects: ProteinProjects[] };
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
  data: ProteinProjects;
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
  data: ProteinProjects
}

export interface IGetSummaryReq {
  projectId: string;
}

export interface Sequence {
  sequence: string;
  fitness: string;
  muts: string;
}

export interface IGetSummaryRes {
  data: {
    totalSequence: number;
    foldImprovement: number;
    percentageSequencesAboveReference: number;
    topMutants: Sequence[];
    highestFitness: {
      sequence: string;
      fitness: string;
    }
    numSequencesAboveReference: {
      totalSequence: string;
      sequencesAboveReferenceCount: number
      hitRate: number;
    },
  };
}

interface TopVariants {
  mutation: string;
  scoreRange: {
    min: number;
    max: number;
  }
};

interface ScoreDistribution {
  label: string;
  count: number;
}

export interface IGetTopVariantsRes {
  data: TopVariants[]
}

export interface IGetTopVariantsReq {
  projectId: string;
  limit: number;
}

export interface IGetScoreDistributionRes {
  data: ScoreDistribution[];
}

export interface IGetScoreDistributionReq {
  projectId: string;
}

export interface IDeleteProject {
  projectId: string;
}

export interface IDeleteProjectRes extends IBaseResponse { };
