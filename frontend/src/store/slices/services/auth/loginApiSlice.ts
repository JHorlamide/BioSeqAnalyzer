import { proteinApi } from "../../apiSlice";
import { API_BASE_URL } from "../../../../config/AppConfig";
import { LoginFormData } from "../../../../schemas/login.schema";
import { ILoginResponse } from "./type";

const loginApiSlice = proteinApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginResponse, LoginFormData>({
      query: (data) => ({
        url: `${API_BASE_URL}/auth/login`,
        method: "POST",
        body: data
      })
    })
  }),

  overrideExisting: true,
})

export const { useLoginUserMutation } = loginApiSlice;
