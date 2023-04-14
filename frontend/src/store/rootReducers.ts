import { combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import { RootState } from ".";
import { AUTH_TOKEN } from "../constants/AuthConstant";
import { proteinApi } from "./slices/apiSlice";

const appReducer = combineReducers({
  auth: authReducer,
  projectReducer: projectReducer,
  [proteinApi.reducerPath]: proteinApi.reducer
})

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logoutUser") {
    if (typeof window !== undefined) {
      localStorage.removeItem(AUTH_TOKEN);
    }

    proteinApi.util.resetApiState();
    window.location.replace("/");
    state = {} as RootState;
  }

  return appReducer(state, action);
}


export default rootReducer;