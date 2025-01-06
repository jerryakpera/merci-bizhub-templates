import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/global';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '@/firebase';
import { Invoice } from '@/features/invoices/invoice-types';
import {
  InvoicesDataTable,
  invoiceTableColumns,
} from '@/features/invoices/components';

export const InvoiceIndex = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const collectionRef = collection(db, 'invoices');
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs
        .map((doc) => {
          const data = doc.data() as Invoice;
          return {
            firebaseId: doc.id,
            ...data,
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);
      setInvoices(updatedData);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className='pb-12'>
      <PageHeader>
        <h1>Invoices List</h1>
      </PageHeader>
      <InvoicesDataTable
        data={invoices}
        columns={invoiceTableColumns}
      />
    </div>
  );
};
