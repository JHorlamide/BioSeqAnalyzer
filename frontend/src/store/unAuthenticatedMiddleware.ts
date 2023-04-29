import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { logoutUser } from "./slices/authSlice";
import { AUTH_TOKEN } from "../constants/AuthConstant";

const TOKEN_EXPIRE = "not authorized tokenexpirederror: jwt expired"

export const unAuthenticatedMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { payload } = action;

    if (payload?.data?.message.toLowerCase() === TOKEN_EXPIRE) {
      console.log({ message: payload?.data?.message.toLowerCase() });
      api.dispatch(logoutUser());
      return;
    }

    if (payload?.status === 500) {
      toast.error("Server Error");
    }

    if (payload?.status === 401) {
      api.dispatch(logoutUser());
      return;
    }

    if (payload?.status === 403) {
      api.dispatch(logoutUser());
      return;
    }

    if (payload?.status === 404) {
      if (typeof window !== undefined && localStorage.getItem(AUTH_TOKEN)) {
        window.location.replace("/projects");
      } else {
        window.location.replace("/");
      }
    }
  }

  return next(action);
}