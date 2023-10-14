/* Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SeqVizProps } from "seqviz";

type Topology = "linear" | "circular" | "both" | "both_flip" | undefined;

interface SeqViewState extends SeqVizProps {
  type: string;
};

const initialState: SeqViewState = {
  seq: "",
  name: "",
  type: "",
  annotations: [],
  viewer: "linear",
  style: undefined,
};

export const seqViewSlice = createSlice({
  name: "seqView",
  initialState,
  reducers: {
    setSeq: (state, action: PayloadAction<string>) => {
      state.seq = action.payload
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },

    setAnnotation: (state, action: PayloadAction<any[]>) => {
      state.annotations = action.payload;
    },

    setViewer: (state, action: PayloadAction<Topology>) => {
      state.viewer = action.payload;
    },

    setViewStyle: (state, action: PayloadAction<Record<string, unknown> | undefined>) => {
      state.style = action.payload
    }
  }
})

export const { setSeq, setViewStyle, setAnnotation, setName, setType, setViewer } = seqViewSlice.actions
export const seqViewReducer = seqViewSlice.reducer;