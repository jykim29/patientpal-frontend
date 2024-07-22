import { LoaderFunction } from 'react-router-dom';
import { API_FAILED } from '@/constants/api';
import { boardService } from '@/services/BoardService';
import { useAuthStore } from '@/store/useAuthStore';

export const listLoader: LoaderFunction = async ({ request }) => {
  const accessToken = useAuthStore.getState().accessToken;
  const page = new URL(request.url).searchParams.get('page') || '0';
  const response = await boardService.getList('FREE', page, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response?.status === API_FAILED) return null;
  return response?.data;
};

export const postLoader: LoaderFunction = async ({ params }) => {
  const accessToken = useAuthStore.getState().accessToken;
  const postId = params['postId'];
  if (!postId) return null;
  const response = await boardService.getPost('FREE', postId, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response?.status === API_FAILED) return null;
  return response?.data;
};
