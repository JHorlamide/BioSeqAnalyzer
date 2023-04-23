import { z } from "zod";

export enum ProjectGoal {
  MAXIMIZE = "Maximize",
  MINIMIZE = "Minimize"
}

export enum MeasuredProperty {
  ACTIVITY = "Activity",
  SOLUBILITY = "Solubility",
  THERMOSTABILITY = "Thermostability"
}

export type InputName =
  | "projectTitle"
  | "measuredProperty"
  | "projectGoal"

  | "proteinPDBID"
  | "uniProtId"
  | "proteinAminoAcidSequence"

export interface IProject {
  projectTitle: string;
  measuredProperty: MeasuredProperty;
  projectGoal: ProjectGoal;

  //OPTIONAL PROPERTY
  proteinPDBID?: string;
  uniProtId?: string;
  proteinAminoAcidSequence?: string;
}

export interface ProjectState {
  project: IProject | null;
}

export const projectSchema = z.object({
  projectTitle: z.string().min(5, { message: "Project tile is required" }),
  measuredProperty: z.nativeEnum(MeasuredProperty)
    .refine((val) => val !== undefined && val !== null, {
      message: "Measured property is a required",
    }),

  projectGoal: z.nativeEnum(ProjectGoal)
    .refine((val) => val !== undefined && val !== null, {
      message: "Project goal is a required",
    }),

  proteinPDBID: z.string().optional(),
  uniProtId: z.string().optional(),
  proteinAminoAcidSequence: z.string().optional()
})

export type ProjectFormData = z.infer<typeof projectSchema>;