import { throttle } from 'lodash';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ScrollProgressBarProps {
  className?: string;
}
export type ScrollHandle = {
  getScrollPercent: ({
    scrollHeight,
    clientHeight,
    scrollTop,
  }: {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
  }) => void;
};

export default forwardRef<ScrollHandle, ScrollProgressBarProps>(
  function ScrollProgressBar({ className = '' }, ref) {
    const [scrollPercentage, setScrollPercentage] = useState<number>(0);
    const newClassName = twMerge(
      'sticky left-0 top-0 h-2 w-full bg-gray-light-medium border shadow-lg',
      className
    );
    useImperativeHandle(ref, () => {
      return {
        getScrollPercent: throttle(
          ({
            scrollHeight,
            clientHeight,
            scrollTop,
          }: {
            scrollHeight: number;
            clientHeight: number;
            scrollTop: number;
          }) => {
            const totalHeight = scrollHeight - clientHeight;
            const percentage = ((scrollTop / totalHeight) * 100).toFixed(2);
            setScrollPercentage(Number(percentage));
          },
          70
        ),
      };
    }, []);
    return (
      <div className={newClassName}>
        <span
          className="block h-full rounded-lg bg-gradient-to-r from-tertiary to-primary transition-all"
          style={{ width: `${scrollPercentage}%` }}
        ></span>
      </div>
    );
  }
);
