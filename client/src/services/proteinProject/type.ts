import { IBaseResponse } from "../../schemas";
import { MeasuredProperty, ProjectGoal } from "../../schemas/proteinProjectSchema";

export interface ProteinProjectData {
  _id: string;
  user: string;
  projectFileName: string;
  pdbFileUrl: string;
  createdAt: string;
  updatedAt: string;

  projectTitle: string;
  measuredProperty: MeasuredProperty;
  projectGoal: ProjectGoal;
  proteinPDBID?: string;
  uniprotId?: string;
  proteinAminoAcidSequence?: string;

}

export interface ICreateProjectRes extends IBaseResponse {
  data: Pick<ProteinProjectData,
    "projectTitle" |
    "measuredProperty" |
    "projectGoal" |
    "proteinPDBID" |
    "uniprotId" |
    "proteinAminoAcidSequence"
  >;
}

export interface IGetProteinSequenceRes extends IBaseResponse {
  data: string;
}

export interface IGetProteinSequenceReq {
  uniprotId: string;
}

export interface IGetProjectsRes extends IBaseResponse {
  totalPages: number;
  totalCount: number;
  data: { projects: ProteinProjectData[] };
}

export type IGetProjectQueryParam = Pick<
  ProteinProjectData,
  "projectTitle" |
  "projectGoal" |
  "measuredProperty"
> & {
  page: number;
  limit: number;
}

export interface IGetProjectReq {
  projectId: string;
}

export interface IGetProjectRes extends IBaseResponse {
  data: ProteinProjectData;
}

export interface IUpdateProjectReq {
  projectId: string;
  data: Pick<ProteinProjectData,
    "projectTitle" |
    "measuredProperty" |
    "projectGoal" |
    "proteinPDBID" |
    "uniprotId" |
    "proteinAminoAcidSequence"
  >;
}

export interface IUpdateProjectRes extends IBaseResponse {
  data: Pick<ProteinProjectData,
    "projectTitle" |
    "measuredProperty" |
    "projectGoal" |
    "proteinPDBID" |
    "uniprotId" |
    "proteinAminoAcidSequence"
  >;
}

export interface IUploadProjectFileReq {
  data: FormData;
  projectId: string;
}

export interface IUploadProjectRes extends IBaseResponse {
  data: ProteinProjectData
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
    topMutants: Sequence[];
    percentageSequencesAboveReference: number;

    highestFitness: {
      sequence: string;
      fitness: string;
    }

    numSequencesAboveReference: {
      hitRate: number;
      totalSequence: string;
      sequencesAboveReferenceCount: number
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
