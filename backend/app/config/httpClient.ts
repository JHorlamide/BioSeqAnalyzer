import axios, { AxiosInstance } from "axios";
import config from "./appConfig";

export const httpClient: AxiosInstance = axios.create({
  baseURL: config.uniprot_base_url,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "node.js"
  }
})

