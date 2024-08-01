import { AxiosRequestConfig } from 'axios';
import {
  BoardType,
  GetListResponse,
  PostResponse,
  RequestBody,
} from '@/types/api/board';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import { HTTPClient, httpClient } from '@/api/httpClient';
import { BoardFormData } from '@/types/formData.interface';
import { FetchResult } from '@/types/api/common';

class BoardService {
  private httpClient;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getList(
    boardType: BoardType,
    pageNumber: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetListResponse>> {
    const endPointKey =
      boardType.toUpperCase() as keyof (typeof API_ENDPOINT)['COMMUNITY'];
    const endPoint = API_ENDPOINT.COMMUNITY[endPointKey];
    const response = await this.httpClient.GET<GetListResponse>(
      `${endPoint}?page=${pageNumber}`,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }
  async getPost(
    boardType: BoardType,
    postId: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<PostResponse>> {
    const endPointKey =
      boardType.toUpperCase() as keyof (typeof API_ENDPOINT)['COMMUNITY'];
    const endPoint = API_ENDPOINT.COMMUNITY[endPointKey];
    const response = await this.httpClient.GET<PostResponse>(
      `${endPoint}/${postId}`,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }
  async deletePost(
    boardType: BoardType,
    postId: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<null>> {
    const endPointKey =
      boardType.toUpperCase() as keyof (typeof API_ENDPOINT)['COMMUNITY'];
    const endPoint = API_ENDPOINT.COMMUNITY[endPointKey];
    const response = await this.httpClient.DELETE<null>(
      `${endPoint}/${postId}`,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }
  async writePost(
    boardType: BoardType,
    formData: BoardFormData,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<PostResponse>> {
    const endPointKey =
      boardType.toUpperCase() as keyof (typeof API_ENDPOINT)['COMMUNITY'];
    const endPoint = API_ENDPOINT.COMMUNITY[endPointKey];
    const response = await this.httpClient.POST<BoardFormData, PostResponse>(
      endPoint,
      formData,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }
  async updatePost(
    boardType: BoardType,
    postId: number,
    formData: BoardFormData,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<PostResponse>> {
    const endPointKey =
      boardType.toUpperCase() as keyof (typeof API_ENDPOINT)['COMMUNITY'];
    const endPoint = API_ENDPOINT.COMMUNITY[endPointKey];
    const response = await this.httpClient.PATCH<
      RequestBody['post'],
      PostResponse
    >(`${endPoint}/${postId}`, formData, config);
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }
}

export const boardService = new BoardService(httpClient);
