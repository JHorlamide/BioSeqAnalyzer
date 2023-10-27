/* Libraries */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

/* Application Modules */
import { RootState } from "../../store/store";
import { AUTH_TOKEN } from "../../constants/AuthConstant";
import { DNA_SEQUENCE_API_BASE_URL } from "../../config/AppConfig";
import {
  ICreateDNASeqProjectsRes,
  ICreateProject,
  IGetProjectParam,
  IGetProjectRes,
  IGetProjectsRes,
  IUpdateProjectReq,
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
    createProject: builder.mutation<ICreateDNASeqProjectsRes, ICreateProject | FormData>({
      query: (data) => ({ url: "/", method: "POST", body: data }),
      invalidatesTags: ["GetAllDNAProjects"]
    }),

    getAllProjects: builder.query<IGetProjectsRes, ReqQueryParam>({
      query: ({ page, name, topology, nucleotideType }) => ({
        url: `/`,
        params: { page, name, topology, nucleotide_type: nucleotideType }
      }),
      providesTags: ["GetAllDNAProjects"],
    }),

    getProject: builder.query<IGetProjectRes, IGetProjectParam>({
      query: ({ projectId }) => ({
        url: `/${projectId}`,
      }),
      providesTags: ["GetDNAProjectDetails"]
    }),

    updateProject: builder.mutation<IGetProjectRes, IUpdateProjectReq>({
      query: ({ projectId, name, topology, nucleotide_type, bases, description }) => ({
        url: `/${projectId}/`,
        method: "PUT",
        body: { name, topology, nucleotide_type, bases, description },
      }),

      invalidatesTags: ["GetAllDNAProjects", "GetDNAProjectDetails"]
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
  /* Mutations */
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,

  /* Queries */
  useGetAllProjectsQuery,
  useGetProjectQuery
} = DNASeqProjectAPI;