import { Middleware, isRejectedWithValue, } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { resetStateAction } from "../actions/resetStateAction";
import { SESSION_EXPIRE_ERROR } from "../../config/AppConfig";

const SERVER_ERROR = 500;
const UNAUTHORIZED_STATUS = {
  FORBIDDEN: 403,
  NOT_AUTHORIZED: 401
}

export const unAuthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload.status === UNAUTHORIZED_STATUS.NOT_AUTHORIZED) {
    toast.error(action.payload.data.message);
    dispatch(resetStateAction());
  }

  if (isRejectedWithValue(action) && action.payload.status === UNAUTHORIZED_STATUS.FORBIDDEN) {
    setTimeout(() => {
      dispatch(resetStateAction());
    }, 2000);

    return toast.error(SESSION_EXPIRE_ERROR);
  }

  if (isRejectedWithValue(action) && action.payload.status === SERVER_ERROR) {
    return toast.error(action.payload.data.message);
  }

  return next(action);
}
