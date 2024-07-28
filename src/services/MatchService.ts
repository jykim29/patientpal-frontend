import { AxiosRequestConfig } from 'axios';
import { httpClient, HTTPClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import {
  GetContractDataResponse,
  GetContractListResponse,
  GetMatchUserInfoResponse,
  SendContractResponse,
  SendRequestBody,
} from '@/types/api/match';
import { UserRole } from '@/types/user';
import { FetchResult } from '@/types/api/common';

class MathService {
  private httpClient;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getMatchUserInfo(
    memberId: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetMatchUserInfoResponse>> {
    const response = await this.httpClient.GET<GetMatchUserInfoResponse>(
      `${API_ENDPOINT.MATCH.USER_INFO}?responseMemberId=${memberId}`,
      config
    );
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }

  async sendContract(
    myRole: UserRole,
    memberId: number,
    data: SendRequestBody['USER'] | SendRequestBody['CAREGIVER'],
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<SendContractResponse>> {
    const endPoint = {
      USER: API_ENDPOINT.MATCH.SEND('patient'),
      CAREGIVER: API_ENDPOINT.MATCH.SEND('caregiver'),
    };
    const response = await this.httpClient.POST<
      SendRequestBody[typeof myRole],
      SendContractResponse
    >(`${endPoint[myRole]}?responseMemberId=${memberId}`, data, config);
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }

  async acceptContract(matchId: number, config: AxiosRequestConfig = {}) {
    const response = await this.httpClient.POST<null>(
      API_ENDPOINT.MATCH.ACCEPT(matchId),
      null,
      config
    );
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }

  async cancelContract(matchId: number, config: AxiosRequestConfig = {}) {
    const response = await this.httpClient.POST<null>(
      API_ENDPOINT.MATCH.CANCEL(matchId),
      null,
      config
    );
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }

  async getSendContractList(
    memberId: number,
    page: number = 0,
    size: number = 10,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetContractListResponse>> {
    const response = await this.httpClient.GET<GetContractListResponse>(
      `${API_ENDPOINT.MATCH.REQUEST(memberId)}?page=${page}&size=${size}`,
      config
    );
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }

  async getReceivedContractList(
    memberId: number,
    page: number = 0,
    size: number = 10,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetContractListResponse>> {
    const response = await this.httpClient.GET<GetContractListResponse>(
      `${API_ENDPOINT.MATCH.RECEIVED(memberId)}?page=${page}&size=${size}`,
      config
    );
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }

  async getContractData(
    matchId: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetContractDataResponse>> {
    const response = await this.httpClient.GET<GetContractDataResponse>(
      API_ENDPOINT.MATCH.INFO(matchId),
      config
    );
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }

  async downloadContractPDF(matchId: number, config: AxiosRequestConfig = {}) {
    const response = await this.httpClient.GET<any>(
      API_ENDPOINT.MATCH.PDF(matchId),
      config
    );
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }
}

export const matchService = new MathService(httpClient);
