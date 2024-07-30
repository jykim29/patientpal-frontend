import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type InitialState = {
  modalName: string | null;
};
type Action = {
  setName: (name: string) => void;
  clearName: () => void;
};

const initialState: InitialState = {
  modalName: null,
};

export const useModalStore = create<InitialState & Action>()(
  devtools((set) => ({
    ...initialState,
    setName: (modalName) => set((state) => ({ ...state, modalName })),
    clearName: () => set((state) => ({ ...state, modalName: null })),
  }))
);
