import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

import { useModal } from '@/hooks/useModal';
import Button from '../common/Button';

interface FeedbackModalProps {
  modalType: 'confirm' | 'alert' | 'success';
  onConfirm?: () => any;
  onClose?: () => any;
}

export default function FeedbackModal({
  modalType,
  onConfirm,
  onClose,
  children,
}: PropsWithChildren<FeedbackModalProps>) {
  const { closeAllModal } = useModal();
  return (
    <div className="flex flex-col items-center gap-4 p-7">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden">
        <Icon modalType={modalType} />
      </div>
      <span className="break-words font-semibold">{children}</span>
      <div className="flex items-center gap-2">
        {modalType !== 'alert' && (
          <Button
            type="button"
            onClick={() => {
              closeAllModal();
              onConfirm && onConfirm();
            }}
          >
            확인
          </Button>
        )}
        {modalType !== 'success' && (
          <Button
            className="bg-negative"
            type="button"
            onClick={() => {
              closeAllModal();
              onClose && onClose();
            }}
          >
            {modalType === 'confirm' ? '취소' : '닫기'}
          </Button>
        )}
      </div>
    </div>
  );
}

function Icon({ modalType }: { modalType: FeedbackModalProps['modalType'] }) {
  const mark =
    modalType === 'alert' ? '!' : modalType === 'success' ? '✔' : '?';
  const borderColor =
    modalType === 'alert'
      ? 'border-negative'
      : modalType === 'success'
        ? 'border-naver'
        : 'border-primary';
  const textColor =
    modalType === 'alert'
      ? 'text-negative'
      : modalType === 'success'
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
