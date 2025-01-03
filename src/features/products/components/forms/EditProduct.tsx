import { useDispatch } from 'react-redux';
import { useState, useContext } from 'react';

import { useToast } from '@/hooks/use-toast';

import { AppDispatch } from '@/app/stores';
import { updateProduct } from '../../products-thunk';
import { AuthContext } from '@/contexts/AuthContext';
import { NewProduct, Product } from '../../products-types';

import { ProductDialog } from '../ProductDialog';
import { ProductForm } from '../forms/ProductForm';

type Props = {
  product: Product;
};

export const EditProduct = ({ product }: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUpdateProduct = (newProduct: NewProduct) => {
    const { id, createdAt, createdBy } = product;

    const currentTimestamp = Date.now();
    const updatedBy = user?.email || '';

    const update: Product = {
      id,
      createdAt,
      createdBy,
      price: newProduct.price,
      genPrice: newProduct.genPrice,
      updatedAt: currentTimestamp,
      updatedBy,
      productName: newProduct.productName,
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
