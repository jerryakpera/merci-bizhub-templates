import { useDispatch } from 'react-redux';
import { useState, useContext } from 'react';

import { useToast } from '@/hooks/use-toast';

import { AppDispatch } from '@/app/stores';
import { updateSale } from '../../sales-thunk';
import { NewSale, Sale } from '../../sales-types';
import { AuthContext } from '@/contexts/AuthContext';

import { SaleDialog } from '../SaleDialog';
import { SaleForm } from '@/features/sales/components/forms/SaleForm';

type Props = {
  sale: Sale;
};

export const EditSale = ({ sale }: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUpdateSale = (newSale: NewSale) => {
    const { id, createdAt, createdBy } = sale;

    const currentTimestamp = Date.now();
    const updatedBy = user?.email || '';

    const update: Sale = {
      id,
      createdAt,
      createdBy,
      paid: newSale.paid,
      updatedBy,
      customerName: newSale.customerName || '',
      updatedAt: currentTimestamp,
      quantity: newSale.quantity,
      unitCost: newSale.unitCost,
      totalCost: newSale.totalCost,
      paymentStatus: newSale.paymentStatus,
      paymentMethod: newSale.paymentMethod,
      outstandingBalance: newSale.outstandingBalance,
      productName: newSale.productName,
    };

    // Dispatch the updateSale thunk to update the sale
    dispatch(updateSale(update))
      .unwrap()
      .then(() => {
        toast({
          title: 'Sale successfully updated',
          description: `${sale.productName} - N${sale.totalCost} (N${sale.paid})`,
        });

        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          title: 'Sale update failed',
          description: error,
        });
      });
  };

  return (
    <SaleDialog
      title='Edit sale'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonIcon='material-symbols:edit-rounded'
      description='Fill in the form correctly to edit this sale.'
    >
      <SaleForm
        sale={sale}
        handleFormSubmit={handleUpdateSale}
      />
    </SaleDialog>
  );
};
