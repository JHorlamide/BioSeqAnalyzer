import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_TOKEN } from "../../constants/AuthConstant";
import { RootState } from "..";

export const proteinApi = createApi({
  reducerPath: "proteinApi",
  tagTypes: ["User", "Projects"],
  baseQuery: fetchBaseQuery({
    prepareHeaders: async (headers, { getState }) => {
      const isBrowser = typeof window !== undefined;
      const token = (getState() as RootState).auth.token || (isBrowser ? localStorage.getItem(AUTH_TOKEN) : null);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),

  endpoints: () => ({}),
  refetchOnReconnect: true
})
