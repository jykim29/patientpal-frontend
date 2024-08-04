import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import { useModal } from '@/hooks/useModal';

interface ModalProps {
  className?: {
    overlay?: string;
    box?: string;
  };
}

export default function Modal({
  className = {},
  children,
}: PropsWithChildren<ModalProps>) {
  return createPortal(
    <ModalOverlay className={className.overlay}>
      <ModalBox className={className.box}>{children}</ModalBox>
    </ModalOverlay>,
    document.querySelector('#modal') as HTMLElement
  );
}

function ModalOverlay({
  className = '',
  children,
}: PropsWithChildren<{
  className?: string;
  onClose?: () => any;
}>) {
  const { closeAllModal } = useModal();
  const combinedClassName = twMerge(
    'fixed w-screen h-screen bg-overlay top-0 left-0 z-10',
    className
  );
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget !== e.target) return;
    closeAllModal();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={combinedClassName}
      onClick={handleClick}
    >
      {children}
    </motion.div>
  );
}

function ModalBox({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  // const { closeAllModal } = useModal();
  const combinedClassName = twMerge(
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white overflow-hidden',
    className
  );
  return (
    <div className={combinedClassName}>
      {/* <button
        className="absolute right-3 top-3 ml-auto h-4 w-4 bg-[url('/assets/cross_black.svg')] bg-center bg-no-repeat hover:bg-gray-light"
        type="button"
        title="창 닫기"
        onClick={() => closeAllModal()}
      >
        <span className="sr-only">창 닫기</span>
      </button> */}
      {children}
    </div>
  );
}
