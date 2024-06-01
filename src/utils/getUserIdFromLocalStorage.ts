// export function getUserIdFromLocalStorage() {
//   const userId = localStorage.getItem('userId');
//   if (!userId) return null;
//   return userId;
// }

export const userIdFromLocalStorage = {
  get: () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return null;
    return userId;
  },
  set: (value: string) => {
    localStorage.setItem('userId', value);
  },
  remove: () => {
    localStorage.removeItem('userId');
  },
};
