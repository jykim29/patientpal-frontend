import { httpClient } from '../http';

export default async function getRefreshToken() {
  const response = await httpClient.post('/auth/refresh', null);
  return response;
}
