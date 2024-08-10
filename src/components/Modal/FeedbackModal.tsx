import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

import Button from '../common/Button';

interface FeedbackModalProps {
  type: 'success' | 'confirm' | 'warning';
  onOk: () => any;
  onCancel: () => any;
}

export default function FeedbackModal({
  type,
  onOk,
  onCancel,
  children,
}: PropsWithChildren<FeedbackModalProps>) {
  return (
    <div className="flex flex-col items-center gap-4 p-7">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden">
        <Icon iconType={type} />
      </div>
      {children}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={() => {
            onOk();
          }}
          autoFocus
        >
          확인
        </Button>
        {type === 'confirm' && (
          <Button
            className="bg-gray-medium"
            type="button"
            onClick={() => {
              onCancel();
            }}
          >
            취소
          </Button>
        )}
      </div>
    </div>
  );
}

function Icon({ iconType }: { iconType: FeedbackModalProps['type'] }) {
  const mark =
    iconType === 'warning' ? '!' : iconType === 'success' ? '✔' : '?';
  const borderColor =
    iconType === 'warning'
      ? 'border-negative'
      : iconType === 'success'
        ? 'border-naver'
        : 'border-primary';
  const textColor =
    iconType === 'warning'
      ? 'text-negative'
      : iconType === 'success'
        ? 'text-naver'
        : 'text-primary';
  return (
    <motion.div
      initial={{ scale: 0.25 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 0.3 }}
      className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 ${borderColor}`}
    >
      <motion.span
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`text-6xl ${textColor}`}
      >
        {mark}
      </motion.span>
    </motion.div>
  );
}
