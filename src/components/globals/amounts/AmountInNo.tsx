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
        htmlFor='amount'
        className='text-sm text-zinc-500'
      >
        Amount:
      </Label>
      <Input
        required
        id='amount'
        type='string'
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
