import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = (): AxiosInstance => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const instance: AxiosInstance = axios.create(axiosConfig);

  return instance;
};

export default apiClient;
