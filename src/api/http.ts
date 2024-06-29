import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, PROXY_BASE_URL, TIMEOUT_SECONDS } from '@/constants/api';

const BASE_URL =
  import.meta.env.MODE === 'development' ? PROXY_BASE_URL : API_BASE_URL;

const createAxiosInstance = (
  baseURL: string,
  defaultConfig: AxiosRequestConfig = {}
) => {
  const axiosInstance = axios.create({
    baseURL,
    ...defaultConfig,
  });
  return axiosInstance;
};

export const httpClient = createAxiosInstance(BASE_URL, {
  timeout: 1 * 1000 * TIMEOUT_SECONDS,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
