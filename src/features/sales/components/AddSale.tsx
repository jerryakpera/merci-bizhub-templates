import { useDispatch } from 'react-redux';
import { useContext, useState } from 'react';

import { useToast } from '@/hooks/use-toast';

import { Sale } from '@/features/sales/sales-types';
import { SaleDialog } from '@/features/sales/components/SaleDialog';
import { SaleForm } from '@/features/sales/components/forms/SaleForm';

import { AppDispatch } from '@/app/stores';
import { AuthContext } from '@/contexts/AuthContext';
import { saveSale } from '@/features/sales/sales-thunk';

export const AddSale = () => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const [addSaleDialogOpen, setAddSaleDialogOpen] = useState<boolean>(false);

  const handleAddSale = (newSale: Partial<Sale>) => {
    const currentTimestamp = Date.now();
    const createdBy = user?.email || '';
    const updatedBy = createdBy;

    const sale: Sale = {
      id: String(currentTimestamp),
      paid: Number(newSale.paid),
      quantity: Number(newSale.quantity),
      unitCost: Number(newSale.unitCost),
      totalCost: Number(newSale.totalCost),
      customerName: newSale.customerName || '',
      paymentStatus: newSale.paymentStatus || 'Paid',
      productName: newSale.productName || '',
      paymentMethod: newSale.paymentMethod || 'Cash',
      outstandingBalance: Number(newSale.outstandingBalance),
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
