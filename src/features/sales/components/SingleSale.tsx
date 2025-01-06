import { format } from 'date-fns';

import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

import { AppDispatch } from '@/app/stores';
import { NairaSign } from '@/components/global';
import { AuthContext } from '@/contexts/AuthContext';
import {
  Sale,
  PaymentMethod,
  PaymentStatus,
} from '@/features/sales/sales-types';
import { updateSale } from '../sales-thunk';

type Props = {
  sale: Sale;
};

export const SingleSale = ({ sale }: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useContext(AuthContext);

  const {
    paid,
    unitCost,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    totalCost,
    quantity,
    productName,
    customerName,
    paymentStatus,
    paymentMethod,
    outstandingBalance,
  } = sale;

  const handleUpdateSale = (
    paid: number,
    outstandingBalance: number,
    paymentStatus: PaymentStatus,
    paymentMethod: PaymentMethod
  ) => {
    const currentTimestamp = Date.now();
    const updatedBy = user?.email || '';

    const update: Partial<Sale> = {
      paid,
      firebaseId: sale.firebaseId,
      updatedBy,
      id: sale.id,
      paymentStatus,
      paymentMethod,
      outstandingBalance,
      updatedAt: currentTimestamp,
    };

    // Dispatch the updateSale thunk to update the sale
    dispatch(updateSale(update))
      .unwrap()
      .then(() => {
        toast({
          title: 'Sale successfully updated',
          description: `${sale.productName} - N${sale.totalCost} (N${sale.paid})`,
        });
      })
      .catch((error) => {
        toast({
          title: 'Sale update failed',
          description: error,
        });
      });
  };

  const handleForgiveBalance = () => {
    if (!sale) return;

    const confirmForgive = window.confirm(
      `Are you sure you want to forgive the outstanding balance of N${sale.outstandingBalance} for ${sale.productName}?`
    );

    if (confirmForgive) {
      const updatedOutstandingBalance = 0;
      const updatedPaymentStatus = 'Paid';

      handleUpdateSale(
        sale.paid,
        updatedOutstandingBalance,
        updatedPaymentStatus,
        sale.paymentMethod
      );
    }
  };

  const handleSettleBalance = () => {
    if (!sale) return;

    const confirmSettle = window.confirm(
      `Are you sure you want to settle the outstanding balance of N${sale.outstandingBalance} for ${sale.productName}?`
    );

    if (confirmSettle) {
      const updatedPaid = sale.paid + sale.outstandingBalance;
      const updatedOutstandingBalance = 0;
      const updatedPaymentStatus = 'Paid';

      handleUpdateSale(
        updatedPaid,
        updatedOutstandingBalance,
        updatedPaymentStatus,
        sale.paymentMethod
      );
    }
  };

  type SaleDetailProps = {
    label: string;
    value: string | number;
  };

  const SaleDetail = ({ label, value }: SaleDetailProps) => {
    return (
      <div className='flex-col -space-y-1'>
        <div className='text-xs text-gray-500 font-medium'>{label}</div>
        <h6 className='font-semibold'>
          {typeof value == 'string' ? (
            value
          ) : (
            <>
              <NairaSign />
              {value}
            </>
          )}
        </h6>
      </div>
    );
  };

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <SaleDetail
            label='Product/Service'
            value={productName}
          />
        </div>
        {customerName && (
          <div className='col-span-1'>
            <SaleDetail
              label='Customer'
              value={customerName}
            />
          </div>
        )}
        <div className='col-span-1'>
          <SaleDetail
            label='Date'
            value={format(createdAt, 'do MMM, yyyy')}
          />
        </div>
      </div>

      <div className='grid grid-cols-3'>
        <div className='cols-span-1'>
          <SaleDetail
            label='Cost x Quantity = Total'
            value={`₦${unitCost} x ${quantity} = ₦${totalCost}`}
          />
        </div>
        <div className='cols-span-1'>
          <SaleDetail
            label='Paid'
            value={paid}
          />
        </div>

        <div
          className={`cols-span-1 font-bold ${
            outstandingBalance < 0 ? 'text-red-700' : 'text-green-700'
          }`}
        >
          <SaleDetail
            label='Balance'
            value={outstandingBalance}
          />
        </div>
      </div>

      <div className='grid grid-cols-3'>
        <div className='cols-span-1'>
          <SaleDetail
            label='Payment Method'
            value={paymentMethod}
          />
        </div>
        <div className='cols-span-1'>
          <SaleDetail
            label='Payment Status'
            value={paymentStatus}
          />
        </div>
      </div>

      <div className='grid grid-cols-3'>
        <div className='cols-span-1'>
          <SaleDetail
            label='Handled by'
            value={createdBy === 'jerryakpera@gmail.com' ? 'JA' : 'IA'}
          />
        </div>
        <div className='cols-span-1'>
          <SaleDetail
            label='Updated by'
            value={updatedBy === 'jerryakpera@gmail.com' ? 'JA' : 'IA'}
          />
        </div>
        <div className='cols-span-1'>
          <SaleDetail
            label='Updated'
            value={format(updatedAt, 'do MMM, yyyy')}
          />
        </div>
      </div>

      {sale.paymentStatus == 'Pending' && (
        <div className='flex justify-end gap-x-2'>
          <Button onClick={handleForgiveBalance}>Forgive</Button>
          <Button onClick={handleSettleBalance}>Settle</Button>
        </div>
      )}
    </div>
  );
};
