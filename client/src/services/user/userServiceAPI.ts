/* Libraries */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

/* Application Modules */
import { RootState } from "../../store/store";
import { AUTH_TOKEN } from "../../constants/AuthConstant";
import { USER_API_BASE_URL } from "../../config/AppConfig";
import { AcceptInvitationReq, AcceptInvitationRes, SendEmailInvitationRes, SendEmailInviteReq } from "./types"

export const USER_API = "USER_API";

export const userAPI = createApi({
  reducerPath: USER_API,
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const isBrowser = typeof window !== undefined;
      const token = (getState() as RootState).auth.token ||
        (isBrowser ? localStorage.getItem(AUTH_TOKEN) : null);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),

  endpoints: (builder) => ({
    sendProjectInvite: builder.mutation<SendEmailInvitationRes, SendEmailInviteReq>({
      query: (data) => ({
        url: "/invite",
        method: "POST",
        body: data,
      })
    }),

    acceptProjectInvite: builder.mutation<AcceptInvitationRes, AcceptInvitationReq>({
      query: (data) => ({
        url: "/invite/accept",
        method: "POST",
        body: data,
      })
    }),
  }),

  refetchOnFocus: true,
  refetchOnReconnect: true
});

export const {
  /* Mutations */
  useSendProjectInviteMutation,
  useAcceptProjectInviteMutation
} = userAPI;
