import { Input } from '@/components/ui/input';

import { FormLabel } from '@/components/globals/FormLabel';

import { PaymentMethod, PaymentStatus } from '@/features/sales/sales-types';

type Props = {
  customerName: string;
  paymentMethod: string;
  paymentStatus: string;
  setCustomerName: (val: string) => void;
  setPaymentMethod: (string: PaymentMethod) => void;
  setPaymentStatus: (string: PaymentStatus) => void;
};

export const InvoiceForm = ({
  customerName,
  paymentMethod,
  paymentStatus,
  setCustomerName,
  setPaymentMethod,
  setPaymentStatus,
}: Props) => {
  return (
    <div className='grid grid-cols-3 items-end gap-x-4 py-2'>
      <div>
        <FormLabel
          label='Customer name'
          htmlForText='customer-name'
        />
        <Input
          type='text'
          value={customerName}
          placeholder='Customer name'
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <div>
        <FormLabel
          label='Payment method'
          htmlForText='payment-method'
        />
        <select
          value={paymentMethod}
          className='border rounded p-2 w-full'
          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
        >
          <option value='Cash'>Cash</option>
          <option value='Card'>Card</option>
          <option value='Transfer'>Transfer</option>
        </select>
      </div>

      <div>
        <FormLabel
          label='Payment status'
          htmlForText='payment-status'
        />
        <select
          id='payment-status'
          value={paymentStatus}
          className='border rounded p-2 w-full'
          onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
        >
          <option value='Paid'>Paid</option>
          <option value='Pending'>Pending</option>
        </select>
      </div>
    </div>
  );
};

export default InvoiceForm;
