export const formatCurrency = (number: number | null): string => {
  const value = isNaN(Number(number)) ? 0 : (number ?? 0);
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
