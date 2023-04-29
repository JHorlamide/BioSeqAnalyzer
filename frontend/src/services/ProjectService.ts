import privateApiClient from "./ApiClient";

interface OptionsParam {
  signal: AbortSignal;
}

type uniProtId = string | undefined

export const getProteinSequence = async (uniprotId: uniProtId, option: OptionsParam) => {
  const response = await privateApiClient.get(`/projects/uniprot/${uniprotId}`, option);
  return response.data;
}