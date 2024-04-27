const filterNonNumbers = (val: string): string => {
  // Use regex to replace any non-numeric character or comma with an empty string
  return val.replace(/[^\d.,]/g, '');
};

export const formatAmount = (value: string): string => {
  // Remove all non-numeric characters and commas
  const numericValue = filterNonNumbers(value);

  // Add commas every three digits from the right
  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedValue;
};
