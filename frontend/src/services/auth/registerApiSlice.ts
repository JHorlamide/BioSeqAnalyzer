import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RegisterFormData } from "../../schemas/register.schema";
import { IRegisterResponse } from "./type";
import { API_BASE_URL } from "../../config/AppConfig";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}` }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegisterResponse, RegisterFormData>({
      query: (data) => ({
        url: `/users/register`,
        method: "POST",
        body: data
      })
    })
  }),
})

export const { useRegisterUserMutation } = registerApi;