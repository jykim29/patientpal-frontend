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
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  className = {},
  closeOnOverlayClick = false,
  children,
}: PropsWithChildren<ModalProps>) {
  return createPortal(
    <ModalOverlay
      className={className.overlay}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <ModalBox className={className.box}>{children}</ModalBox>
    </ModalOverlay>,
    document.querySelector('#modal') as HTMLElement
  );
}

function ModalOverlay({
  className = '',
  closeOnOverlayClick,
  children,
}: PropsWithChildren<{
  className?: string;
  closeOnOverlayClick: ModalProps['closeOnOverlayClick'];
  onClose?: () => any;
}>) {
  const { closeAllModal } = useModal();
  const combinedClassName = twMerge(
    'fixed w-screen h-screen bg-overlay top-0 left-0 z-10',
    className
  );
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget !== e.target) return;
    if (closeOnOverlayClick) closeAllModal();
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
  const combinedClassName = twMerge(
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white overflow-hidden',
    className
  );
  return <div className={combinedClassName}>{children}</div>;
}
