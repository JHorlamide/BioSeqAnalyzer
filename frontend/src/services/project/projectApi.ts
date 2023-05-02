import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from "../../config/AppConfig";
import { ProjectFormData } from "../../schemas/project.schema";
import {
  ICreateProjectRes,
  IGetProteinSequenceRes,
  IGetProteinSequenceReq,
  IGetProjectsRes
} from "./type";
import { RootState } from "../../store/store";
import { AUTH_TOKEN } from "../../constants/AuthConstant";

export const PROJECT_API_REDUCER_KEY = "projectApi";

export const projectApi = createApi({
  reducerPath: PROJECT_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
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
    createProject: builder.mutation<ICreateProjectRes, ProjectFormData>({
      query: (data) => ({
        url: `/projects`,
        method: "POST",
        body: data
      })
    }),

    getProteinSequence: builder.query<IGetProteinSequenceRes, IGetProteinSequenceReq>({
      query: ({ uniprotId }) => ({
        url: `/projects/uniprot/${uniprotId}`
      })
    }),

    getProjects: builder.query<IGetProjectsRes, void>({
      query: () => `/projects`,
    })
  })
})

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProteinSequenceQuery
} = projectApi;
