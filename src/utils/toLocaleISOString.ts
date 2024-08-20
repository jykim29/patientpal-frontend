import { formatInTimeZone } from 'date-fns-tz';

export const toLocaleISOString = (
  date: Date,
  timezone: string = 'Asia/Seoul'
): string => {
  return formatInTimeZone(date, timezone, "yyyy-MM-dd'T'HH:mm:ss.SSS");
};
