import { LoaderFunction } from 'react-router-dom';
import { API_FAILED } from '@/constants/api';
import { boardService } from '@/services/BoardService';
import { useAuthStore } from '@/store/useAuthStore';
import { getBoardType } from '@/utils/getBoardType';

export const listLoader: LoaderFunction = async ({ request }) => {
  const boardType = getBoardType(request.url);
  if (!boardType) return null;
  const accessToken = useAuthStore.getState().accessToken;
  const page = new URL(request.url).searchParams.get('page') || '0';
  const response = await boardService.getList(boardType, Number(page), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response?.status === API_FAILED) return null;
  return response?.data;
};

export const postLoader: LoaderFunction = async ({ request, params }) => {
  const boardType = getBoardType(request.url);
  if (!boardType) return null;
  const accessToken = useAuthStore.getState().accessToken;
  const postId = params['postId'];
  if (!postId) return null;
  const response = await boardService.getPost(boardType, Number(postId), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response?.status === API_FAILED) return null;
  return response?.data;
};
