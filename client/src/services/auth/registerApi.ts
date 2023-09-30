import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegisterFormData } from "../../schemas/registerSchema";
import { IRegisterResponse } from "./type";
import { USER_API_BASE_URL } from "../../config/AppConfig";

export const REGISTER_API_REDUCER_KEY = 'registerApi';

export const registerApi = createApi({
  reducerPath: REGISTER_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: `${USER_API_BASE_URL}` }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegisterResponse, RegisterFormData>({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data
      })
    })
  }),
})

export const { useRegisterUserMutation } = registerApi;