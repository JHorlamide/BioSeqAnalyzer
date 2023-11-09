import { Middleware, isRejectedWithValue, } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { resetStateAction } from "../actions/resetStateAction";
import { SESSION_EXPIRE_ERROR } from "../../config/AppConfig";

const API_ERROR = {
  FORBIDDEN: 403,
  NOT_AUTHORIZED: 401,
  SERVER_ERROR: 500
}

export const unAuthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload.status === API_ERROR.NOT_AUTHORIZED) {
    toast.error(action.payload.data.message);
    dispatch(resetStateAction());
  }

  if (isRejectedWithValue(action) && action.payload.status === API_ERROR.FORBIDDEN) {
    setTimeout(() => {
      dispatch(resetStateAction());
    }, 2000);

    return toast.error(SESSION_EXPIRE_ERROR);
  }

  if (isRejectedWithValue(action) && action.payload.status === API_ERROR.SERVER_ERROR) {
    // console.log(action.payload.data)
    return toast.error(action.payload.data.message);
  }

  return next(action);
}
