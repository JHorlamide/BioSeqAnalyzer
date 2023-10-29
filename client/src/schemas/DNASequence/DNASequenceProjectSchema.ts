import { z } from "zod";

export enum NucleotideType {
  DNA = "D",
  RNA = "R"
}

export enum TopologyType {
  CIRCULAR = "C",
  LINEAR = "L",
  BOTH = "B",
  BOTH_FLIP = "B_F"
}

export type InputName =
  | "name"
  | "file"
  | "bases"
  | "description"
  | "sequence_id"
  | "nucleotide_type"
  | "topology"

  export const projectSchema = z.object({
  name: z.string().min(5, { message: "Project name is required" }).optional(),
  bases: z.string().optional(),
  sequence_id: z.string().optional(),
  description: z.string().optional(),
  nucleotide_type: z.nativeEnum(NucleotideType)
    .refine((val) => val !== undefined && val !== null, {
      message: "Nucleotide is required",
    }),

  topology: z.nativeEnum(TopologyType)
    .refine((val) => val !== undefined && val !== null, {
      message: "Topology is required",
    }),
})

export type ProjectFormData = z.infer<typeof projectSchema>;

export type CreateProjectFormField = {
  name?: string;
  bases?: string;
  description?: string;
  sequence_id?: string;
  topology: TopologyType;
  nucleotide_type: NucleotideType;
}
