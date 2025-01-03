import { useDispatch } from 'react-redux';
import { useContext, useState } from 'react';

import { useToast } from '@/hooks/use-toast';

import { SaleDialog } from '@/features/sales/components/SaleDialog';
import { SaleForm } from '@/features/sales/components/forms/SaleForm';
import { NewSale, Sale } from '@/features/sales/sales-types';

import { AppDispatch } from '@/app/stores';
import { saveSale } from '@/features/sales/sales-thunk';
import { AuthContext } from '@/contexts/AuthContext';

export const AddSale = () => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const [addSaleDialogOpen, setAddSaleDialogOpen] = useState<boolean>(false);

  const handleAddSale = (newSale: NewSale) => {
    const currentTimestamp = Date.now();
    const createdBy = user?.email || '';
    const updatedBy = createdBy;

    const sale: Sale = {
      id: String(currentTimestamp),
      paid: newSale.paid,
      quantity: newSale.quantity,
      unitCost: newSale.unitCost,
      totalCost: newSale.totalCost,
      customerName: newSale.customerName || '',
      paymentStatus: newSale.paymentStatus,
      productName: newSale.productName,
      paymentMethod: newSale.paymentMethod,
      outstandingBalance: newSale.outstandingBalance,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      createdBy,
      updatedBy,
    };

    // Dispatch the saveSale thunk to save the sale
    dispatch(saveSale(sale))
      .unwrap()
      .then(() => {
        toast({
          title: 'Sale successfully added',
          description: `${sale.productName} - N${sale.totalCost} (N${sale.paid})`,
        });

        setAddSaleDialogOpen(false);
      })
      .catch((error) => {
        toast({
          title: 'Sale was not added',
          description: error,
        });
      });
  };

  return (
    <SaleDialog
      title='Add a sale'
      buttonLabel='Add Sale'
      isOpen={addSaleDialogOpen}
      setIsOpen={setAddSaleDialogOpen}
      description='Fill in the form correctly to add a new sale.'
    >
      <SaleForm handleFormSubmit={handleAddSale} />
    </SaleDialog>
  );
};
