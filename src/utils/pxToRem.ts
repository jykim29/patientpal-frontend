export function pxToRem(px: number, baseSize: number = 16) {
  const rem = (px / baseSize).toFixed(3);
  return rem + 'rem';
}
