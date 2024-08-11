import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GetUserDataResponse } from '@/types/api/member';

type InitialState = {
  isLoggedIn: boolean;
  user: GetUserDataResponse | null;
  accessToken: string | null;
  lastLogin: string | null;
};
type Action = {
  get: () => void;
  update: (newState: Partial<InitialState>) => void;
  reset: () => void;
};
const initialState = {
  isLoggedIn: false,
  user: null,
  accessToken: null,
  lastLogin: null,
};

export const useAuthStore = create<InitialState & Action>()(
  devtools((set) => ({
    ...initialState,
    get: () => set((state) => state),
    update: (newState) => set((state) => ({ ...state, ...newState })),
    reset: () => set((state) => ({ ...state, ...initialState })),
  }))
);
