import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/global';
import { ProductsTable } from '@/features/products/components';

import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '@/firebase';
import { Product } from '../products-types';

export const ProductsIndex = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const collectionRef = collection(db, 'products');
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => {
        const data = doc.data() as Product;
        return {
          firebaseId: doc.id,
          ...data,
        };
      });
      setProducts(updatedData);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className='pb-12'>
      <PageHeader>
        <h1>Products List</h1>
      </PageHeader>
      <ProductsTable
        products={products}
        tableCaption='All products offered by Merci Bizhub'
      />
    </div>
  );
};
