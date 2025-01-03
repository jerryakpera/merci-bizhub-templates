import { useState } from 'react';

import { Product } from '@/features/products/products-types';
import { ProductDialog } from '@/features/products/components/ProductDialog';
import { SingleProduct } from '@/features/products/components/SingleProduct';

type Props = {
  product: Product;
};

export const ViewProduct = ({ product }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ProductDialog
      isOpen={isOpen}
      title='View product'
      setIsOpen={setIsOpen}
      buttonIcon='raphael:view'
      description='View details about product.'
    >
      <SingleProduct product={product} />
    </ProductDialog>
  );
};
