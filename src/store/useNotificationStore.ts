import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type NotificationItem = {
  id: string;
  name: string;
  content: string;
  type: 'MATCH' | 'CHAT' | 'REVIEW';
  createdDate: string;
};
type InitialState = {
  notificationList: NotificationItem[];
};
type Action = {
  setList: (value: NotificationItem) => void;
  resetList: () => void;
};
const initialState: InitialState = {
  notificationList: [],
};

export const useNotificationStore = create<InitialState & Action>()(
  devtools((set) => ({
    ...initialState,
    setList: (value) =>
      set((state) => ({
        ...state,
        notificationList: [...state.notificationList, value],
      })),
    resetList: () => set((state) => ({ ...state, notificationList: [] })),
  }))
);
