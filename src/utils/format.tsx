export const formatNumber = (number: number) => {
  return number.toLocaleString();
};

export const formatGenderToKR = (gender: string) => {
  if (gender === 'MALE') {
    return '남';
  } else if (gender === 'FEMALE') {
    return '여';
  }
};
