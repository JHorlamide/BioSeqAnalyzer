/* Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  projectGoal: "",
  measuredProperty: "",
};

export const proteinAnalyzerFilterSlice = createSlice({
  name: "proteinAnalyzerFilter",
  initialState,
  reducers: {
    setSearQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },

    setProjectGoal: (state, action: PayloadAction<string>) => {
      state.projectGoal = action.payload;
    },

    setMeasuredProperty: (state, action: PayloadAction<string>) => {
      state.measuredProperty = action.payload;
    },

    clearFilterState: (state) => {
      state.searchQuery = "";
      state.projectGoal = "";
      state.measuredProperty = "";
    }
  }
})

export const {
  setSearQuery,
  setProjectGoal,
  clearFilterState,
  setMeasuredProperty
} = proteinAnalyzerFilterSlice.actions
export const proteinAnalyzerFilterReducer = proteinAnalyzerFilterSlice.reducer;