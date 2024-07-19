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

class BoardService {
  private httpClient;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getList(
    boardType: BoardType,
    pageNumber: string,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const endPoint = API_ENDPOINT[boardType];
      const response = await this.httpClient.GET<GetListResponse>(
        `${endPoint}?page=${pageNumber}`,
        config
      );
      if (response.status === API_FAILED) {
        return { data: response.data, status: API_FAILED };
      }
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      console.error(error);
    }
  }
  async getPost(
    boardType: BoardType,
    postId: string,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const endPoint = API_ENDPOINT[boardType];
      const response = await this.httpClient.GET<PostResponse>(
        `${endPoint}/${postId}`,
        config
      );
      if (response.status === 'FAILED') {
        return { data: response.data, status: API_FAILED };
      }
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      console.error(error);
    }
  }
  async deletePost(
    boardType: BoardType,
    postId: number,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const endPoint = API_ENDPOINT[boardType];
      const response = await this.httpClient.DELETE<null>(
        `${endPoint}/${postId}`,
        config
      );
      if (response.status === 'FAILED') {
        // ...
      }
      // ...
    } catch (error) {
      console.error(error);
    }
  }
  async writePost(
    boardType: BoardType,
    formData: BoardFormData,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const endPoint = API_ENDPOINT[boardType];
      const response = await httpClient.POST<BoardFormData, PostResponse>(
        endPoint,
        formData,
        config
      );
      if (response.status === 'FAILED') {
        return { data: response.data, status: API_FAILED };
      }
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      console.error(error);
    }
  }
  async updatePost(
    boardType: BoardType,
    postId: string,
    formData: BoardFormData,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const endPoint = API_ENDPOINT[boardType];
      const response = await this.httpClient.PATCH<
        RequestBody['post'],
        PostResponse
      >(`${endPoint}/${postId}`, formData, config);
      if (response.status === 'FAILED') {
        return { data: response.data, status: API_FAILED };
      }
      return { data: response.data, status: API_SUCCESS };
    } catch (error) {
      console.error(error);
    }
  }
}

export const boardService = new BoardService(httpClient);
