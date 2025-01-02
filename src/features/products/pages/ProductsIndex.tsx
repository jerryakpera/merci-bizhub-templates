import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageHeader } from '@/components/global';
import { ProductsTable } from '@/features/products/components';

import { AppDispatch } from '@/app/stores';
import { fetchProducts } from '../products-thunk';
import { selectProducts } from '@/features/products/products-slice';

export const ProductsIndex = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
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
