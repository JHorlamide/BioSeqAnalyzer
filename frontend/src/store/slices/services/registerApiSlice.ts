import { IRegisterResponse } from "../../../schemas/register.schema";
import { proteinApi } from "../apiSlice";
import { API_BASE_URL } from "../../../config/AppConfig";
import { RegisterFormData } from "../../../schemas/register.schema";

export const registerApiSlice = proteinApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegisterResponse, RegisterFormData>({
      query: (data) => ({
        url: `${API_BASE_URL}/users/register`,
        method: "POST",
        body: data
      })
    })
  }),

  overrideExisting: true,
})

export const { useRegisterUserMutation } = registerApiSlice;