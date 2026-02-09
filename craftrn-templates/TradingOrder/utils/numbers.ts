export const formatCurrency = (number: number | null, decimals = 2): string => {
  const value = isNaN(Number(number)) ? 0 : (number ?? 0);
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Parses a formatted number string (with commas) to a raw numeric string
 * Example: "1,234.56" -> "1234.56"
 */
export const parseFormattedNumber = (text: string): string => {
  // Remove commas and other non-numeric characters except decimal point
  return text.replace(/[^\d.]/g, '');
};

/**
 * Formats a raw numeric string to display format with commas
 * Limits to 2 decimal places
 * Example: "1234.56" -> "1,234.56"
 */
export const formatNumberForDisplay = (rawValue: string): string => {
  if (!rawValue) {
    return '';
  }

  // Remove any non-numeric characters except decimal point
  const cleaned = rawValue.replace(/[^\d.]/g, '');

  if (!cleaned) {
    return '';
  }

  // Handle multiple decimal points - keep only the first one
  const parts = cleaned.split('.');
  let integerPart = parts[0] || '';
  let decimalPart = parts.length > 1 ? parts[1] : '';

  // Limit to 2 decimal places
  if (decimalPart.length > 2) {
    decimalPart = decimalPart.substring(0, 2);
  }

  // Format integer part with commas
  let formattedInteger = '';
  if (integerPart) {
    const num = parseInt(integerPart, 10);
    if (!isNaN(num)) {
      formattedInteger = num.toLocaleString('en-US');
    } else {
      formattedInteger = integerPart;
    }
  }

  // Combine parts
  if (decimalPart) {
    return formattedInteger
      ? `${formattedInteger}.${decimalPart}`
      : `.${decimalPart}`;
  }
  if (cleaned.includes('.')) {
    return formattedInteger ? `${formattedInteger}.` : '.';
  }
  return formattedInteger || cleaned;
};

/**
 * Validates and cleans raw numeric input
 * Returns a raw numeric string (without commas) limited to 2 decimals
 */
export const cleanRawInput = (text: string): string => {
  // Remove any non-numeric characters except decimal point
  const cleaned = text.replace(/[^\d.]/g, '');

  // Handle multiple decimal points - keep only the first one
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }

  // Limit to 2 decimal places
  if (parts.length === 2 && parts[1].length > 2) {
    return parts[0] + '.' + parts[1].substring(0, 2);
  }

  return cleaned;
};
