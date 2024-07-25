export const validateObject = (obj: { [key: string]: any }): boolean => {
  for (const value of Object.values(obj)) {
    if (!value) return false;
    if (typeof value === 'object') {
      return validateObject(value);
    }
  }
  return true;
};
