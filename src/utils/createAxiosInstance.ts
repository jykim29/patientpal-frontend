import axios, { AxiosRequestConfig } from 'axios';

export const createAxiosInstance = (
  baseURL: string,
  defaultConfig: AxiosRequestConfig = {}
) => {
  const axiosInstance = axios.create({
    baseURL,
    ...defaultConfig,
  });
  return axiosInstance;
};
