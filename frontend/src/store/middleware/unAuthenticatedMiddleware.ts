import { Middleware, isRejectedWithValue, } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { logoutUser } from "../slices/authSlice";
import { AUTH_TOKEN } from "../../constants/AuthConstant";
import { resetStateAction } from "../actions/resetStateAction";

const TOKEN_EXPIRE = "not authorized tokenexpirederror: jwt expired"
const UNAUTHORIZED_STATUS = {
  FORBIDDEN: 403,
  NOT_AUTHORIZED: 401
}

export const unAuthenticatedMiddleware: Middleware = ({
  dispatch
}) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload.status === UNAUTHORIZED_STATUS.NOT_AUTHORIZED) {
    dispatch(resetStateAction());
  }

  if (isRejectedWithValue(action) && action.payload.status === UNAUTHORIZED_STATUS.FORBIDDEN) {
    dispatch(resetStateAction());
  }

  if (isRejectedWithValue(action) && action.payload.status === 500) {
    toast.error(`Server Error: ${action.payload.data.message}`);
  }


  if (isRejectedWithValue(action) && action.payload.data.message.toLowerCase() === TOKEN_EXPIRE) {
    dispatch(resetStateAction());
  }

  return next(action);
}
