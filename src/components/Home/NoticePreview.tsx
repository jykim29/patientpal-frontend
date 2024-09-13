import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsMegaphoneFill } from 'react-icons/bs';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { format } from 'date-fns';
import { boardService } from '@/services';
import { GetListResponse } from '@/types/api/board';
import { API_FAILED } from '@/constants/api';
import { toLocaleISOString } from '@/utils/toLocaleISOString';

const textLoopVariants: Variants = {
  enter: {
    y: -30,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 30,
    opacity: 0,
  },
};

function NoticePreview() {
  const PAGE_SIZE = 5;
  const [noticeList, setNoticeList] = useState<GetListResponse['content']>([]);
  const [index, setIndex] = useState<number>(0);
  const slicedNoticeList = noticeList.slice(0, PAGE_SIZE);
  const getNoticeData = useCallback(async () => {
    const { data, status } = await boardService.getList('notice', 0);
    if (status === API_FAILED) return;
    setNoticeList(data.content);
  }, []);

  useEffect(() => {
    getNoticeData();
    const intervalId = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next > PAGE_SIZE - 1) return 0;
        return next;
      });
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="flex h-[50px] w-full items-center gap-4 rounded-md border-2 border-tertiary bg-white px-[20px] py-2">
      <BsMegaphoneFill className="h-6 w-6" color="red" />
      <p className="text-text-large font-bold">공지사항</p>
      <ul className="relative h-full flex-1 overflow-hidden">
        {slicedNoticeList.length > 0 && (
          <AnimatePresence>
            <motion.li
              key={index}
              className="absolute h-full"
              variants={textLoopVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Link
                to={`/community/notice/view/${slicedNoticeList[index].id}`}
                className="flex h-full items-center gap-3 hover:text-primary"
              >
                <p>{slicedNoticeList[index].title}</p>
                <time
                  dateTime={toLocaleISOString(
                    new Date(slicedNoticeList[index].updatedAt)
                  )}
                  className="text-text-small text-gray-medium-dark"
                >
                  {format(slicedNoticeList[index].updatedAt, 'yyyy-MM-dd')}
                </time>
              </Link>
            </motion.li>
          </AnimatePresence>
        )}
      </ul>
    </div>
  );
}

export default NoticePreview;
