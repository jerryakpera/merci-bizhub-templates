import { format } from 'date-fns';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MerciLogo from '@/assets/logo.png';
import { fetchInvoiceById } from '@/features/invoices/invoice-thunk';
import {
  selectInvoicesError,
  selectInvoiceDetail,
  selectInvoicesStatus,
} from '@/features/invoices/invoice-slice';

import { AppDispatch } from '@/app/stores';
import { NairaSign, Spinner } from '@/components/global';

export const InvoiceDetail = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { firebaseId } = useParams();
  const error = useSelector(selectInvoicesError);
  const invoice = useSelector(selectInvoiceDetail);
  const status = useSelector(selectInvoicesStatus);

  useEffect(() => {
    if (firebaseId) {
      dispatch(fetchInvoiceById(firebaseId));
    }
  }, [firebaseId, dispatch]);

  // Render loading state, error message, or the invoice details
  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!invoice) {
    return <div>No invoice found</div>;
  }

  const { sales, createdAt, totalCost, customerName } = invoice;

  return (
    <div className='space-y-8 py-8'>
      <div className='flex justify-end'>
        <img
          src={MerciLogo}
          className='w-28 sm:w-40'
        />
      </div>

      <h1 className='text-5xl font-black uppercase tracking-wide border-b-2 border-black'>
        Invoice
      </h1>

      <div className='space-y-4'>
        <div className='flex items-end gap-x-2'>
          <h5 className='uppercase text-gray-700 font-semibold'>
            Accustomed To:
          </h5>
          <h2 className='font-bold text-xl'>{customerName}</h2>
        </div>

        <div className='flex items-end gap-x-2'>
          <h5 className='uppercase text-gray-700 font-semibold'>Date:</h5>
          <h2 className='font-bold text-xl'>
            {format(createdAt, 'do MMM, h:mm b')}
          </h2>
        </div>

        <div className='flex items-end gap-x-2'>
          <h5 className='uppercase text-gray-700 font-semibold'>ID:</h5>
          <h2 className='font-bold text-xl'>{firebaseId}</h2>
        </div>
      </div>

      <div className='divide-y'>
        <div className='grid grid-cols-12 text-2xl font-bold'>
          <div className='col-span-4 p-3'>Description</div>
          <div className='col-span-2 p-3'>Qty</div>
          <div className='col-span-2 p-3'>Price</div>
          <div className='col-span-4 p-3'>Amount</div>
        </div>
        {sales.map((sale) => {
          return (
            <div
              key={sale.id}
              className='grid grid-cols-12 text-lg font-bold divide-x '
            >
              <div className='col-span-4 p-3'>{sale.productName}</div>
              <div className='col-span-2 p-3'>{sale.quantity}</div>
              <div className='col-span-2 p-3'>
                <NairaSign />
                {sale.unitCost}
              </div>
              <div className='col-span-4 p-3'>
                <NairaSign />
                {sale.totalCost}
              </div>
            </div>
          );
        })}

        <div className='grid grid-cols-12 text-lg font-bold divide-x '>
          <div className='col-span-8 p-3'>Total</div>
          <div className='col-span-4 p-3 font-black text-2xl'>
            <NairaSign />
            {totalCost.toFixed(2)}
          </div>
        </div>
      </div>

      <div className='text-center'>
        <p className='text-sm text-gray-700'>merci-bizhub.web.app</p>
        <p className='text-sm text-gray-700'>
          Top Floor, UTC Shopping Complex
          <br />
          No. 10 Lugard Rd
        </p>
      </div>
    </div>
  );
};
