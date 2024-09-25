import { LoaderFunction } from 'react-router-dom';
import { API_FAILED } from '@/constants/api';
import { boardService } from '@/services';
import { useAuthStore } from '@/store/useAuthStore';
import { getBoardType } from '@/utils/getBoardType';

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardType = getBoardType(request.url);
  if (!boardType) return null;
  const accessToken = useAuthStore.getState().accessToken;
  const postId = params['postId'];
  if (!postId) return null;
  const response = await boardService.getPost(boardType, Number(postId), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response.status === API_FAILED) return null;
  return response.data;
};
