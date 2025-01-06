import { useEffect, useState } from 'react';

import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

import { PageHeader } from '@/components/global';

import { Sale } from '../sales-types';
import { SalesDataTable } from '../components/sales-table/sales-data-table';
import { saleTableColumns } from '@/features/sales/components/sales-table/sales-table-columns';

export const SalesIndex = () => {
  const [sales, setSales] = useState<Sale[]>([]);

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

  return (
    <div className='pb-12'>
      <PageHeader>
        <h1>Sales List</h1>
      </PageHeader>
      <SalesDataTable
        data={sales}
        columns={saleTableColumns}
      />
    </div>
  );
};
