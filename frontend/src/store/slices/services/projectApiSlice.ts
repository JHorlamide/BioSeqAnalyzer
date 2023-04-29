import { proteinApi } from "../apiSlice";
import { API_BASE_URL } from "../../../config/AppConfig";
import {
  ICreateProjectRes,
  ProjectFormData,
  IGetProteinSequenceRes,
  IGetProteinSequenceReq,
  IFetchProjects
} from "../../../schemas/project.schema";

const projectApiSlice = proteinApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<ICreateProjectRes, ProjectFormData>({
      query: (data) => ({
        url: `${API_BASE_URL}/projects`,
        method: "POST",
        body: data
      })
    }),

    getProteinSequence: builder.query<IGetProteinSequenceRes, IGetProteinSequenceReq>({
      query: ({ uniprotId }) => ({
        url: `${API_BASE_URL}/projects/uniprot/${uniprotId}`
      })
    }),

    getProjects: builder.query<IFetchProjects, void>({
      query: () => ({
        url: `${API_BASE_URL}/projects`
      })
    })
  })
})

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProteinSequenceQuery
} = projectApiSlice;