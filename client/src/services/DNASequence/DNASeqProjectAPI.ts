/* Libraries */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

/* Application Modules */
import { RootState } from "../../store/store";
import { AUTH_TOKEN } from "../../constants/AuthConstant";
import { DNA_SEQUENCE_API_BASE_URL } from "../../config/AppConfig";
import { ProjectFormData } from "../../schemas/DNASequence/DNASequenceProjectSchema";
import {
  DNASeqProjects,
  IGetProjectsRes,
  ReqQueryParam
} from "./types"

export const DNA_PROJECT_API_REDUCER_KEY = "DNASeqProjectsAPI";

export const DNASeqProjectAPI = createApi({
  reducerPath: DNA_PROJECT_API_REDUCER_KEY,
  tagTypes: ["GetAllDNAProjects", "GetDNAProjectDetails", "CreateDNAProject"],
  baseQuery: fetchBaseQuery({
    baseUrl: DNA_SEQUENCE_API_BASE_URL,
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
    createProject: builder.mutation<DNASeqProjects, ProjectFormData>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data
      }),

      invalidatesTags: ["GetAllDNAProjects"]
    }),

    getAllProjects: builder.query<IGetProjectsRes, ReqQueryParam>({
      query: ({ name, topology, nucleotideType }) => ({
        url: `/`,
        params: { name, topology, nucleotideType }
      }),

      providesTags: ["GetAllDNAProjects"]
    }),

    deleteProject: builder.mutation<Response, { projectId: string }>({
      query: ({ projectId }) => ({
        url: `/${projectId}`,
        method: "DELETE"
      }),

      invalidatesTags: ["GetAllDNAProjects"]
    })
  }),

  refetchOnFocus: true,
  refetchOnReconnect: true
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} = DNASeqProjectAPI;