import { useCallback } from 'react';

import { useModalStore } from '@/store/useModalStore';
import Modal from '@/components/common/Modal';

type CreateModalFunction = (
  config: {
    modalName: any;
    closeOnOverlayClick?: boolean | undefined;
  },
  Component: React.ReactNode
) => JSX.Element | null;

export const useModal = () => {
  const { setName, clearName } = useModalStore();

  const createModal: CreateModalFunction = (config, Component) => {
    const { modalName, closeOnOverlayClick = false } = config;
    const storeModalName = useModalStore((state) => state.modalName);
    const ModalComponent = (
      <Modal closeOnOverlayClick={!closeOnOverlayClick}>{Component}</Modal>
    );
    return storeModalName === modalName ? ModalComponent : null;
  };

  const openModal = useCallback((modalName: string) => {
    document.body.style.overflow = 'hidden';
    return setName(modalName);
  }, []);
  const closeAllModal = useCallback(() => {
    document.body.removeAttribute('style');
    return clearName();
  }, []);

  return { createModal, openModal, closeAllModal };
};
