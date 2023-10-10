import { env } from "./EnvironmentConfig";

export const APP_NAME = 'Protein Analyzer';
export const USER_API_BASE_URL = env?.USER_API_ENDPOINT_URL as string;
export const PROTEIN_API_BASE_URL = env?.PROTEIN_API_ENDPOINT_URL as string;
export const DNA_SEQUENCE_API_BASE_URL = env?.DNA_SEQUENCE_API_ENDPOINT_URL as string;
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';
export const REDIRECT_URL_KEY = 'redirect'
export const AUTHENTICATED_ENTRY = `${APP_PREFIX_PATH}/protein-analyzer/dashboard`;
export const DNA_SEQ_ENTRY = `${APP_PREFIX_PATH}/dna-sequence/dashboard`;
export const UNAUTHENTICATED_ENTRY = '/login';
export const FILE_FORMAT = "pdb";
export const PDB_BASE_URL = "https://files.rcsb.org/download"
export const SAMPLE_CSV_LINK = "https://docs.google.com/spreadsheets/d/1X4ghV84RugwWRaKGkrzdgpU97tvLgI0L/edit?usp=sharing&ouid=102774188348459063916&rtpof=true&sd=true";
export const SESSION_EXPIRE_ERROR = "Session Expired. Logging you out";

export const toastStyle = {
  success: {
    style: {
      background: "#08355a",
      color: "white",
      padding: "4px 5px",
      fontWeight: "semibold"
    }
  },

  error: {
    style: {
      background: "#8B0000",
      color: "white",
      padding: "4px 5px",
      fontWeight: "semibold"
    }
  }
}
