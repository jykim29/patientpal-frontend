import { AxiosRequestConfig } from 'axios';
import {
  BoardType,
  GetListResponse,
  GetPostResponse,
  RequestBody,
  UpdatePostResponse,
  WritePostResponse,
} from '@/types/api/board';
import { API_ENDPOINT } from '@/constants/api';
import { HTTPClient, httpClient } from '@/api/httpClient';
import { BoardFormData } from '@/types/formData.interface';

class BoardService {
  private httpClient;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getList(
    boardType: BoardType,
    pageNumber: number = 1,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const endPoint = API_ENDPOINT[boardType];
      const response = await this.httpClient.GET<GetListResponse>(
        `${endPoint}?page=${pageNumber}`,
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
  async getPost(
    boardType: BoardType,
    postId: number,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const endPoint = API_ENDPOINT[boardType];
      const response = await this.httpClient.GET<GetPostResponse>(
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
      const response = await httpClient.POST<BoardFormData, WritePostResponse>(
        endPoint,
        formData,
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
  async updatePost(
    boardType: BoardType,
    postId: number,
    formData: BoardFormData,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const endPoint = API_ENDPOINT[boardType];
      const response = await this.httpClient.PATCH<
        RequestBody['post'],
        UpdatePostResponse
      >(`${endPoint}/${postId}`, formData, config);
      if (response.status === 'FAILED') {
        // ...
      }
      // ...
    } catch (error) {
      console.error(error);
    }
  }
}

export const boardService = new BoardService(httpClient);
