import { useModalStore } from '@/store/useModalStore';

export const useModal = () => {
  const { setName, clearName } = useModalStore();

  const createModal = (modalName: string, Component: React.ReactNode) => {
    const storeModalName = useModalStore((state) => state.modalName);
    return storeModalName === modalName ? Component : null;
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
