import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PROTEIN_API_BASE_URL } from "../../config/AppConfig";
import { ProjectFormData } from "../../schemas/protineAnalyzer/protinProjectSchema";
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
  IUploadProjectFileReq,
  IGetSummaryReq,
  IGetSummaryRes,
  IGetTopVariantsRes,
  IGetTopVariantsReq,
  IGetScoreDistributionRes,
  IGetScoreDistributionReq
} from "./type";
import { RootState } from "../../store/store";
import { AUTH_TOKEN } from "../../constants/AuthConstant";

export const PROJECT_API_REDUCER_KEY = "projectsApi";

export const projectApi = createApi({
  reducerPath: PROJECT_API_REDUCER_KEY,
  tagTypes: ["GetAllProjects", "GetProjectDetails", "CreateProject", "ProteinSequence"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${PROTEIN_API_BASE_URL}`,
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
        url: `/`,
        method: "POST",
        body: data
      }),

      invalidatesTags: ["GetAllProjects"]
    }),

    getProjects: builder.query<IGetProjectsRes, IGetProjectQueryParam>({
      query: ({ page, limit, search }) => ({
        url: `/`,
        params: { page, limit, search }
      }),

      providesTags: ["GetAllProjects"]
    }),

    getProject: builder.query<IGetProjectRes, IGetProjectReq>({
      query: ({ projectId }) => ({
        url: `/${projectId}`
      }),

      providesTags: ["GetProjectDetails"]
    }),

    updateProject: builder.mutation<IUpdateProjectRes, IUpdateProjectReq>({
      query: ({ projectId, data }) => ({
        url: `/${projectId}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["GetAllProjects", "GetProjectDetails"]
    }),

    uploadProjectFile: builder.mutation<IUploadProjectRes, IUploadProjectFileReq>({
      query: ({ data, projectId }) => ({
        url: `/${projectId}/csv-upload`,
        method: "POST",
        body: data
      }),

      invalidatesTags: ["GetProjectDetails"]
    }),

    getSummaryMainMatrices: builder.query<IGetSummaryRes, IGetSummaryReq>({
      query: ({ projectId }) => ({
        url: `/${projectId}/summary-table-of-main-matrices`,
      })
    }),

    getTopVariants: builder.query<IGetTopVariantsRes, IGetTopVariantsReq>({
      query: ({ projectId, limit }) => ({
        url: `/${projectId}/top-performing-variants?limit=${limit}`,
      })
    }),

    getScoreDistribution: builder.query<IGetScoreDistributionRes, IGetScoreDistributionReq>({
      query: ({ projectId }) => ({
        url: `/${projectId}/score-distribution`,
      })
    }),

    deleteProject: builder.mutation<IDeleteProjectRes, IDeleteProject>({
      query: ({ projectId }) => ({
        url: `/${projectId}`,
        method: "DELETE"
      }),

      invalidatesTags: ["GetAllProjects"]
    })

    // getProteinSequence: builder.query<IGetProteinSequenceRes, IGetProteinSequenceReq>({
    //   query: ({ uniprotId }) => `/uniprot/${uniprotId}`,
    //   providesTags: ["ProteinSequence"]
    // }),
  }),

  refetchOnFocus: true,
  refetchOnReconnect: true
})

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUploadProjectFileMutation,
  useGetSummaryMainMatricesQuery,
  useGetTopVariantsQuery,
  useGetScoreDistributionQuery
  // useGetProteinSequenceQuery,
} = projectApi;
