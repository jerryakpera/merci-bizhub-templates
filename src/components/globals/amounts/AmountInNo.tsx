import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { useFormatNumAmount } from '.';

type Props = {
  formattedAmount: string;
  setFormattedAmount: (val: string) => void;
};

export const AmountInNo = ({ formattedAmount, setFormattedAmount }: Props) => {
  const { formatAmount, handleAmountChange } =
    useFormatNumAmount(setFormattedAmount);

  return (
    <>
      <Label
        htmlFor='amountInNo'
        className='text-sm text-zinc-500'
      >
        Amount in Number:
      </Label>
      <Input
        required
        type='text'
        id='amountInNo'
        placeholder='10,000'
        value={formattedAmount}
        onChange={handleAmountChange}
        onBlur={(e) => {
          const { value } = e.target;
          const formattedValue = formatAmount(value);
          setFormattedAmount(formattedValue);
        }}
      />
    </>
  );
};
