import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginFormData } from "../../schemas/login.schema";
import { ILoginResponse } from "./type";
import { API_BASE_URL } from '../../config/AppConfig';

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginResponse, LoginFormData>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data
      })
    })
  })
})

export const { useLoginUserMutation } = loginApi;
