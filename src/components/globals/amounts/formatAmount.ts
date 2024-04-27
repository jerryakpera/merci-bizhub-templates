export const filterNonNumbers = (val: string): string => {
  // Use regex to replace any non-numeric character or comma with an empty string
  return val.replace(/[^\d.]|(?<=\.\d*)\./g, '');
};

export const formatAmount = (value: string): string => {
  // Remove all non-numeric characters and commas
  let numericValue = filterNonNumbers(value);

  // Truncate the decimal part after two digits
  const decimalIndex = numericValue.indexOf('.');
  if (decimalIndex !== -1) {
    const decimalPart = numericValue.slice(decimalIndex + 1);
    if (decimalPart.length > 2) {
      numericValue = numericValue.slice(0, decimalIndex + 3);
    }
  }

  // Add commas every three digits from the right
  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedValue;
};
