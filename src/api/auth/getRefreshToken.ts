import { api } from '../api';

export default async function getRefreshToken() {
  const response = await api.post(
    '/auth/refresh',
    {
      refresh_token: 'abc',
    },
    {
      withCredentials: true,
    }
  );
  return response;
}
