import { env } from "./EnvironmentConfig";

export const APP_NAME = 'Protein Analyzer';
export const API_BASE_URL = env?.API_ENDPOINT_URL as string;
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';
export const REDIRECT_URL_KEY = 'redirect'
export const AUTHENTICATED_ENTRY = `${APP_PREFIX_PATH}/dashboard`;
export const UNAUTHENTICATED_ENTRY = '/login';

export const SESSION_EXPIRE_ERROR = "Session Expired";
