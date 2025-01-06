import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { FormLabel } from '@/components/globals/FormLabel';
import { SelectedProduct } from '../invoice-types';

interface InvoiceSummaryProps {
  totalCost: number;
  totalPaid: number;
  customerName: string;
  outstandingBalance: number;
  handleGenerateInvoice: () => void;
  selectedProducts: SelectedProduct[];
  handleTotalPaidChange: (newTotalPaid: number) => void;
}

export const InvoiceSummary = ({
  totalCost,
  totalPaid,
  outstandingBalance,
  handleTotalPaidChange,
  handleGenerateInvoice,
  customerName,
  selectedProducts,
}: InvoiceSummaryProps) => (
  <div className='flex items-end justify-end gap-x-2'>
    <div>
      <FormLabel
        label='Total cost'
        htmlForText='total-cost'
      />
      <Input
        readOnly
        type='number'
        id='total-cost'
        value={totalCost.toFixed(2)}
        placeholder='Total cost'
      />
    </div>
    <div>
      <FormLabel
        label='Total paid'
        htmlForText='total-paid'
      />
      <Input
        type='number'
        value={totalPaid}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleTotalPaidChange(Number(e.target.value))
        }
        placeholder='Total paid'
        id='total-paid'
      />
    </div>
    <div>
      <FormLabel
        label='Outstanding balance'
        htmlForText='outstanding-balance'
      />
      <Input
        readOnly
        type='number'
        id='outstanding-balance'
        value={outstandingBalance.toFixed(2)}
        placeholder='Outstanding balance'
      />
    </div>
    <Button
      onClick={handleGenerateInvoice}
      disabled={!customerName || selectedProducts.length === 0}
    >
      Generate Invoice
    </Button>
  </div>
);

export default InvoiceSummary;
