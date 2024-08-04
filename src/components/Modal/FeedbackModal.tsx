import { PropsWithChildren, useEffect } from 'react';
import { motion } from 'framer-motion';

import { useModal } from '@/hooks/useModal';
import Button from '../common/Button';

interface FeedbackModalProps {
  iconType: 'check' | 'question' | 'warning';
  buttonType: 'confirm' | 'confirm-cancel' | 'cancel';
  onConfirm?: () => any;
  onClose?: () => any;
}

export default function FeedbackModal({
  iconType,
  buttonType,
  onConfirm,
  onClose,
  children,
}: PropsWithChildren<FeedbackModalProps>) {
  const { closeAllModal } = useModal();

  return (
    <div className="flex flex-col items-center gap-4 p-7">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden">
        <Icon iconType={iconType} />
      </div>
      {children}
      <div className="flex items-center gap-2">
        {buttonType !== 'cancel' && (
          <Button
            type="button"
            onClick={() => {
              closeAllModal();
              if (onConfirm) onConfirm();
            }}
            autoFocus
          >
            확인
          </Button>
        )}
        {buttonType !== 'confirm' && (
          <Button
            className="bg-negative"
            type="button"
            onClick={() => {
              closeAllModal();
              onClose && onClose();
            }}
          >
            닫기
          </Button>
        )}
      </div>
    </div>
  );
}

function Icon({ iconType }: { iconType: FeedbackModalProps['iconType'] }) {
  const mark = iconType === 'warning' ? '!' : iconType === 'check' ? '✔' : '?';
  const borderColor =
    iconType === 'warning'
      ? 'border-negative'
      : iconType === 'check'
        ? 'border-naver'
        : 'border-primary';
  const textColor =
    iconType === 'warning'
      ? 'text-negative'
      : iconType === 'check'
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
