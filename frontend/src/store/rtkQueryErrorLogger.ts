import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { logoutUser } from "./slices/authSlice";
import { AUTH_TOKEN } from "../constants/AuthConstant";

export const rtkQueryErrorLogger:
  Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { payload } = action;

      if (payload?.data?.message.toLowerCase() === "jwt expired") {
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

      if (payload?.status === 404) {
        if (typeof window !== undefined && localStorage.getItem(AUTH_TOKEN)) {
          window.location.replace("/projects");
        } else {
          window.location.replace("/");
        }
      }

      toast.error(payload?.data?.message ?? "Server Error")
    }

    return next(action);
  }