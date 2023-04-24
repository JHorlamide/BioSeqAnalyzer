import axios, { AxiosInstance } from "axios";
import { UNIPROT_BASE_URL } from "./environmentConfig";

export const apiClient: AxiosInstance = axios.create({
  baseURL: UNIPROT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "node.js"
  }
})

