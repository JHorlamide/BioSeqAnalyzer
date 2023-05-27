import mongoose, { Schema, model } from "mongoose";
import { ProjectModel, ProjectGoal, MeasuredProperty } from "../types/types";

const projectSchema = new Schema<ProjectModel>({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  projectTitle: { type: String, required: true },

  projectGoal: {
    type: String,
    default: ProjectGoal.MINIMIZE,
    validate: {
      validator: (value: ProjectGoal) => {
        if (!Object.values(ProjectGoal).includes(value)) {
          throw new Error(`Invalid project goal: ${value}`);
        }
      }
    }
  },

  measuredProperty: {
    type: String,
    default: MeasuredProperty.ACTIVITY,
    validate: {
      validator: (value: MeasuredProperty) => {
        if (!Object.values(MeasuredProperty).includes(value)) {
          throw new Error(`Invalid measured property: ${value}`);
        }
      }
    }
  },

  proteinPDBID: { type: String },
  pdbFileUrl: { type: String },
  uniprotId: { type: String },
  proteinAminoAcidSequence: { type: String },
  projectFile: {
    fileName: { type: String },
    Bucket: { type: String },
    Key: { type: String },
  },
}, { timestamps: true })

export default model<ProjectModel>("Project", projectSchema);