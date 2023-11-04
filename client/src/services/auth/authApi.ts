import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginFormData } from "../../schemas/auth/loginSchema";
import { ForgotPasswordReq, ForgotPasswordRes, ILoginResponse, ResetPasswordReq, ResetPasswordRes } from "./type";
import { USER_API_BASE_URL } from '../../config/AppConfig';

export const AUTH_API_REDUCER_KEY = 'authApi';

export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: `${USER_API_BASE_URL}` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginResponse, LoginFormData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data
      }),
    }),

    forgotPassword: builder.mutation<ForgotPasswordRes, ForgotPasswordReq>({
      query: ({ email }) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email }
      })
    }),

    resetPassword: builder.mutation<ResetPasswordRes, ResetPasswordReq>({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: { ...data }
      })
    })
  })
})

export const {
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
