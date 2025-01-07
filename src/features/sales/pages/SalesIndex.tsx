import { useEffect, useState } from 'react';

import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/global';

import { Sale } from '../sales-types';
import { CalendarDialog } from '@/components/global/CalendarDialog';
import { SalesDataTable } from '../components/sales-table/sales-data-table';
import { saleTableColumns } from '@/features/sales/components/sales-table/sales-table-columns';
import { FormLabel } from '@/components/globals/FormLabel';

export const SalesIndex = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [addSaleDialogOpen, setAddSaleDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const collectionRef = collection(db, 'sales');
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs
        .map((doc) => {
          const data = doc.data() as Sale;
          return {
            firebaseId: doc.id,
            ...data,
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);
      setSales(updatedData);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setFilteredSales(sales);
      return;
    }

    const filtered = sales.filter((sale) => {
      // Convert the createdAt timestamp to a date object
      const saleDate = new Date(sale.createdAt);

      // Format both saleDate and selectedDate in the local time zone
      const saleDateString = saleDate.toLocaleDateString();
      const selectedDateString = selectedDate.toLocaleDateString();

      // Compare the formatted dates
      return saleDateString === selectedDateString;
    });

    setFilteredSales(filtered);
  }, [sales, selectedDate]);

  return (
    <div className='pb-12'>
      <div className='flex justify-between items-center'>
        <PageHeader>
          <h1>Sales List</h1>
        </PageHeader>
        <div className='flex gap-x-2 items-end'>
          <div className='space-y-0'>
            <FormLabel
              label='Rows'
              htmlForText='rows'
            />
            <Input
              min={1}
              id='rows'
              type='number'
              value={pageSize}
              className='w-24 text-center'
              onChange={(e) => setPageSize(Number(e.target.value))}
            />
          </div>
          <CalendarDialog
            isOpen={addSaleDialogOpen}
            selectedDate={selectedDate}
            setIsOpen={setAddSaleDialogOpen}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
      <SalesDataTable
        pageSize={pageSize}
        data={filteredSales}
        columns={saleTableColumns}
      />
    </div>
  );
};
