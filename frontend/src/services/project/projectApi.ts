import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from "../../config/AppConfig";
import { ProjectFormData } from "../../schemas/project.schema";
import {
  ICreateProjectRes,
  IGetProteinSequenceRes,
  IGetProteinSequenceReq,
  IGetProjectsRes,
  IGetProjectQueryParam,
  IGetProjectReq,
  IGetProjectRes,
  IUpdateProjectRes,
  IUpdateProjectReq,
  IDeleteProject,
  IDeleteProjectRes,
  IUploadProjectRes,
  IUploadProjectFileReq
} from "./type";
import { RootState } from "../../store/store";
import { AUTH_TOKEN } from "../../constants/AuthConstant";

export const PROJECT_API_REDUCER_KEY = "projectsApi";

export const projectApi = createApi({
  reducerPath: PROJECT_API_REDUCER_KEY,
  tagTypes: ["Projects", "User"],
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
      }),

      invalidatesTags: ["Projects"]
    }),

    getProteinSequence: builder.query<IGetProteinSequenceRes, IGetProteinSequenceReq>({
      query: ({ uniprotId }) => `/uniprot/${uniprotId}`
    }),

    getProjects: builder.query<IGetProjectsRes, IGetProjectQueryParam>({
      query: ({ page, limit, search }) => ({
        url: `/projects`,
        params: { page, limit, search }
      }),

      providesTags: ["Projects"]
    }),

    getProject: builder.query<IGetProjectRes, IGetProjectReq>({
      query: ({ projectId }) => ({
        url: `/projects/${projectId}`
      })
    }),

    updateProject: builder.mutation<IUpdateProjectRes, IUpdateProjectReq>({
      query: ({ projectId, data }) => ({
        url: `/projects/${projectId}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Projects"]
    }),

    uploadProjectFile: builder.mutation<IUploadProjectRes, IUploadProjectFileReq>({
      query: ({ data, projectId }) => ({
        url: `/projects/${projectId}/csv-upload`,
        method: "POST",
        body: data
      })
    }),

    deleteProject: builder.mutation<IDeleteProjectRes, IDeleteProject>({
      query: ({ projectId }) => ({
        url: `/projects/${projectId}`,
        method: "DELETE"
      }),

      invalidatesTags: ["Projects"]
    })
  }),

  refetchOnFocus: true,
  refetchOnReconnect: true
})

export const {
  useCreateProjectMutation,
  useGetProteinSequenceQuery,
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUploadProjectFileMutation
} = projectApi;
