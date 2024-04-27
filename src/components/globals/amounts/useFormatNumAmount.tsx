import { ChangeEvent } from 'react';

import { formatAmount } from './formatAmount';

export const useFormatNumAmount = (
  setFormattedAmount: (val: string) => void
) => {
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const formattedValue = formatAmount(value);

    setFormattedAmount(formattedValue);
  };

  return {
    formatAmount,
    handleAmountChange,
  };
};
