import { proteinApi } from "../apiSlice";
import { API_BASE_URL } from "../../../config/AppConfig";
import { ILoginResponse, LoginFormData } from "../../../schemas/login.schema";

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

export const { useLoginUserMutation } = loginApiSlice