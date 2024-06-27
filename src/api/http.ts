import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = '/api/v1';

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: '', //토큰 처리
    },
    withCredentials: true,
    ...config,
  });

  return axiosInstance;
};

export const httpClient = createClient();
