import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  API_SUCCESS,
  API_FAILED,
  BASE_URL,
  TIMEOUT_SECONDS,
} from '@/constants/api';
import { ErrorResponse, FetchResult } from '@/types/api/common';
import { createAxiosInstance } from '@/utils/createAxiosInstance';

const axiosInstance = createAxiosInstance(BASE_URL.API, {
  timeout: 1 * 1000 * TIMEOUT_SECONDS,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export class HTTPClient {
  private axiosInstance: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }
  /**
   *
   * @template T API Response Type
   * @param url API Endpoint
   * @param config Axios Config
   * @returns
   */
  async GET<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;
      return { data: response!.data, status: API_FAILED };
    }
  }
  /**
   *
   * @template T API Request Body Type
   * @template U API Response Type
   * @param url API Endpoint
   * @param data API request Body
   * @param config Axios config
   * @returns
   */
  async POST<T, U = any>(
    url: string,
    data: T,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<U>> {
    try {
      const response = await this.axiosInstance.post<U>(url, data, config);
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;
      return { data: response!.data, status: API_FAILED };
    }
  }
  /**
   *
   * @template T API Request Body Type
   * @template U API Response Type
   * @param url API Endpoint
   * @param data API request Body
   * @param config Axios Config
   * @returns
   */
  async PATCH<T, U>(
    url: string,
    data: T,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<U>> {
    try {
      const response = await this.axiosInstance.patch<U>(url, data, config);
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;
      return { data: response!.data, status: API_FAILED };
    }
  }
  /**
   *
   * @template T API Response Type
   * @param url API Endpoint
   * @param config Axios Config
   * @returns
   */
  async DELETE<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;
      return { data: response!.data, status: API_FAILED };
    }
  }

  async PUT<T, U>(
    url: string,
    data: T,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<U>> {
    try {
      const response = await this.axiosInstance.put<U>(url, data, config);
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;
      return { data: response!.data, status: API_FAILED };
    }
  }
}

export const httpClient = new HTTPClient(axiosInstance);
