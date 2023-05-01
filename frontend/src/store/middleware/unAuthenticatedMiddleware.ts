import { Middleware, isRejectedWithValue, } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { logoutUser } from "../slices/authSlice";
import { AUTH_TOKEN } from "../../constants/AuthConstant";
import { resetStateAction } from "../actions/resetStateAction";

const TOKEN_EXPIRE = "not authorized tokenexpirederror: jwt expired"
const SERVER_ERROR = 500;
const UNAUTHORIZED_STATUS = {
  FORBIDDEN: 403,
  NOT_AUTHORIZED: 401
}

export const unAuthenticatedMiddleware: Middleware = ({
  dispatch
}) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload.status === UNAUTHORIZED_STATUS.NOT_AUTHORIZED) {
    console.log({ message: action.payload.message, status: action.payload.status })
    dispatch(resetStateAction());
  }

  if (isRejectedWithValue(action) && action.payload.status === UNAUTHORIZED_STATUS.FORBIDDEN) {
    console.log({ message: action.payload.message, status: action.payload.status })
    dispatch(resetStateAction());
  }

  if (isRejectedWithValue(action) && action.payload.status === SERVER_ERROR) {
    console.log({ message: action.payload.message, status: action.payload.status })
    toast.error(`Server Error: ${action.payload.data.message}`);
  }

  if (isRejectedWithValue(action) && action.payload.data.message.toLowerCase() === TOKEN_EXPIRE) {
    console.log({ message: action.payload.message, status: action.payload.status })
    dispatch(resetStateAction());
  }

  return next(action);
}
