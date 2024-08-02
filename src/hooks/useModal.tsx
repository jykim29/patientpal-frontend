import { useModalStore } from '@/store/useModalStore';
import Modal from '@/components/common/Modal';

export const useModal = () => {
  const { setName, clearName } = useModalStore();

  const createModal = (modalName: string, Component: React.ReactNode) => {
    const storeModalName = useModalStore((state) => state.modalName);
    const ModalComponent = <Modal>{Component}</Modal>;
    return storeModalName === modalName ? ModalComponent : null;
  };

  const openModal = (modalName: string) => {
    document.body.style.overflow = 'hidden';
    return setName(modalName);
  };
  const closeAllModal = () => {
    document.body.removeAttribute('style');
    return clearName();
  };

  return { createModal, openModal, closeAllModal };
};
