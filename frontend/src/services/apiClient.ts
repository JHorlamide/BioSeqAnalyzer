import axios from "axios";

// const URL = "https://cors-anywhere.herokuapp.com/https://files.rcsb.org/download/https://www.rcsb.org/3d-view/1BTL.pdb";
const URL = "https://cors-anywhere.herokuapp.com/https://files.rcsb.org/download/https://www.rcsb.org/3d-view/";
const URL_1 =  "https://files.rcsb.org/download";

export const apiClient = axios.create({
  baseURL: URL,
})