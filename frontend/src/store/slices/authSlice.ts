import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../schemas/login.schema";
import { User } from "../../schemas/login.schema";

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },

    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const { setUser, setToken, setRefreshToken, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;