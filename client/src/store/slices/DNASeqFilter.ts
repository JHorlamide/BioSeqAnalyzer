/* Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  nucleotideType: "",
  topology: "",
  currentPage: 1
};

export const DNASeqFilterSlice = createSlice({
  name: "DNASeqFilter",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },

    setNucleotideType: (state, action: PayloadAction<string>) => {
      state.nucleotideType = action.payload;
    },

    setTopology: (state, action: PayloadAction<string>) => {
      state.topology = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    clearFilterState: (state) => {
      state.name = "";
      state.topology = "";
      state.nucleotideType = "";
      state.currentPage = 1;
    }
  }
})

export const {
  setName,
  setNucleotideType,
  clearFilterState,
  setTopology,
  setCurrentPage
} = DNASeqFilterSlice.actions;
export const DNASeqFilterReducer = DNASeqFilterSlice.reducer;