import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type InitialState = {
  modalName: string | null;
  dialogState: {
    type: 'confirm' | 'warning' | 'success';
    message: string;
    handleOk: () => void;
    handleCancel: () => void;
  } | null;
};
type Action = {
  setName: (name: string) => void;
  clearName: () => void;
  setDialogState: (value: InitialState['dialogState']) => void;
};

const initialState: InitialState = {
  modalName: null,
  dialogState: null,
};

export const useModalStore = create<InitialState & Action>()(
  devtools((set) => ({
    ...initialState,
    setName: (modalName) => set((state) => ({ ...state, modalName })),
    clearName: () => set((state) => ({ ...state, modalName: null })),
    setDialogState: (value) =>
      set((state) => ({ ...state, dialogState: value })),
  }))
);
