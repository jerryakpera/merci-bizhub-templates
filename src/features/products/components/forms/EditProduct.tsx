import { useDispatch } from 'react-redux';
import { useState, useContext } from 'react';

import { useToast } from '@/hooks/use-toast';

import { AppDispatch } from '@/app/stores';
import { updateProduct } from '../../products-thunk';
import { AuthContext } from '@/contexts/AuthContext';

import { ProductDialog } from '../ProductDialog';
import { ProductForm } from '../forms/ProductForm';
import { Product } from '@/features/products/products-types';

type Props = {
  product: Product;
};

export const EditProduct = ({ product }: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUpdateProduct = (newProduct: Partial<Product>) => {
    const { firebaseId } = product;

    const currentTimestamp = Date.now();
    const updatedBy = user?.email || '';

    const update: Partial<Product> = {
      updatedBy,
      firebaseId,
      updatedAt: currentTimestamp,
      stock: newProduct.stock || 0,
      favorite: newProduct.favorite,
      category: newProduct.category,
      price: Number(newProduct.price),
      genPrice: Number(newProduct.genPrice),
      productName: newProduct.productName || '',
    };

    // Dispatch the updateProduct thunk to update the product
    dispatch(updateProduct(update))
      .unwrap()
      .then(() => {
        toast({
          title: 'Product successfully updated',
          description: `${update.productName} - N${update.price} (N${update.genPrice})`,
        });

        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          title: 'Product update failed',
          description: error,
        });
      });
  };

  return (
    <ProductDialog
      title='Edit product'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonIcon='material-symbols:edit-rounded'
      description='Fill in the form correctly to edit this product.'
    >
      <ProductForm
        product={product}
        handleFormSubmit={handleUpdateProduct}
      />
    </ProductDialog>
  );
};
