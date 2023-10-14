/* Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  projectGoal: "",
  measuredProperty: "",
  currentPage: 1
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

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    clearFilterState: (state) => {
      state.searchQuery = "";
      state.projectGoal = "";
      state.measuredProperty = "";
      state.currentPage = 1;
    }
  }
})

export const {
  setSearQuery,
  setProjectGoal,
  clearFilterState,
  setMeasuredProperty,
  setCurrentPage,
} = proteinAnalyzerFilterSlice.actions;

export const proteinAnalyzerFilterReducer = proteinAnalyzerFilterSlice.reducer;