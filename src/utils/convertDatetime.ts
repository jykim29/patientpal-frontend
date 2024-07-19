import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const convertDatetime = (date: string | number) => {
  if (Number.isNaN(new Date(date).getTime()))
    throw new Error('convertDatetime 함수의 인수가 올바른 형식이 아닙니다.');
  const adjustedDate = new Date(new Date(date).getTime() + 1000 * 3600 * 9); // 한국시간으로 변환 (UTC+9)
  const convertedDate = format(adjustedDate, 'yyyy-MM-dd', { locale: ko });
  const convertedTime = format(adjustedDate, 'HH:mm', { locale: ko });
  return [convertedDate, convertedTime];
};
