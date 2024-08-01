import { BoardType } from '@/types/api/board';

export const getBoardType = (url: string): BoardType => {
  let pathname = url;
  if (url.startsWith('http')) pathname = new URL(url).pathname;
  if (pathname.includes('/community/forum')) return 'board';
  if (pathname.includes('/community/notice')) return 'notice';
  return 'board';
};
