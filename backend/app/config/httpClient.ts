import axios, { AxiosInstance } from "axios";
import config from "./appConfig";

export const httpClient: AxiosInstance = axios.create({
  baseURL: config.uniprotBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "node.js"
  }
})

