import { useSelector } from 'react-redux';

import { PageHeader } from '@/components/global';
import { ProductsTable } from '@/features/products/components';

import { selectProducts } from '@/features/products/products-slice';

export const ProductsIndex = () => {
  const products = useSelector(selectProducts);

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
