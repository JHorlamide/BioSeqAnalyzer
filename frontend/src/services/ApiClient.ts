import axios, { AxiosRequestConfig, AxiosError, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../config/AppConfig";
import { AUTH_TOKEN, REFRESH_TOKEN } from "../constants/AuthConstant";
import { toast } from "react-hot-toast";

const privateApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
})

function getTokenFomLocalStorage() {
  const token = localStorage.getItem(AUTH_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  return { token, refreshToken };
}

privateApiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { token } = getTokenFomLocalStorage();

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      };
    }

    return config as InternalAxiosRequestConfig;
  },

  (error: AxiosError) => {
    Promise.reject(error);
  }
);

privateApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;

      const { token, refreshToken } = getTokenFomLocalStorage();
      const payload = {
        accessToken: token,
        refreshToken: refreshToken
      };

      const apiResponse = await axios.post("/auth/refresh-token", payload);
      localStorage.setItem(AUTH_TOKEN, apiResponse.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, apiResponse.data.refreshToken);

      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${apiResponse.data.accessToken}`;

      return privateApiClient(prevRequest);
    }

    if (
      error?.response?.status === 403 &&
      error?.response?.message === "jwt expired"
    ) {
      alert("Jwt Expired");
      window.location.replace("/login");
      toast.error(`${error?.response?.message}`);
      return privateApiClient(prevRequest);
    }

    return Promise.reject(error);
  }
);
