import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, ProjectState } from "../../schemas/project.schema";

const initialState: ProjectState = {
  project: null
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<IProject | null>) => {
      const { payload } = action;
      state.project = payload;
    }
  }
})

export const { setProject } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
