import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type InitialState = { access_token: string | null };

interface TokenState extends InitialState {
  get: () => void;
  set: (newToken: string | null) => void;
  delete: () => void;
}

const initialState: InitialState = {
  access_token: null,
};

export const useAccessTokenStore = create<TokenState>()(
  devtools((set) => ({
    ...initialState,
    get: () => set((state) => state),
    set: (newToken) => set(() => ({ access_token: newToken })),
    delete: () => set(() => ({ access_token: null })),
  }))
);
