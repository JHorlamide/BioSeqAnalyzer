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
  | "uniprotId"
  | "proteinAminoAcidSequence"

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
  uniprotId: z.string().optional(),
  proteinAminoAcidSequence: z.string().optional()
})

export type ProjectFormData = z.infer<typeof projectSchema>;

export type IProject = {
  projectTitle: string;
  measuredProperty: MeasuredProperty;
  projectGoal: ProjectGoal;
  proteinPDBID?: string;
  uniprotId?: string;
  proteinAminoAcidSequence?: string;
}
