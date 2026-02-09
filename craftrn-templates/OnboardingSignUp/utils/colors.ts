export const colorWithOpacity = (color: string, opacity: number) => {
  const hex = color.replace('#', '');
  return `#${hex}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
};
