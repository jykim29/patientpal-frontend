import { AxiosRequestConfig } from 'axios';
import { HTTPClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import { FetchResult } from '@/types/api/common';
import { GetTopRatedCaregiversResponse } from '@/types/api/review';

export default class ReviewService {
  private httpClient;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getTopRatedCaregiver(
    region: string,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetTopRatedCaregiversResponse>> {
    const { data, status } =
      await this.httpClient.GET<GetTopRatedCaregiversResponse>(
        `${API_ENDPOINT.REVIEW.TOP_CAREGIVERS}?region=${region}`,
        config
      );
    if (status === API_FAILED) return { data, status: API_FAILED };
    return { data, status: API_SUCCESS };
  }
}
