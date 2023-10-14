/* Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  nucleotideType: "",
  topology: "",
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

    clearFilterState: (state) => {
      state.name = "";
      state.topology = "";
      state.nucleotideType = "";
    }
  }
})

export const { setName, setNucleotideType, clearFilterState, setTopology } = DNASeqFilterSlice.actions;
export const DNASeqFilterReducer = DNASeqFilterSlice.reducer;