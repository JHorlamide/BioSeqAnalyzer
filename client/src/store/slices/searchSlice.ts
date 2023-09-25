// searchSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;