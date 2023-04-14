import { Schema, model } from "mongoose";
import { UserModel } from "../types/types";

const userSchema = new Schema<UserModel>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const User = model<UserModel>("User", userSchema);
