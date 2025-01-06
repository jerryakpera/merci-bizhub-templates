import { Product } from '@/features/products/products-types';
import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
  product: Product;
  handleSelectProduct: (product: Product) => void;
};

export const ProductRow = ({ product, handleSelectProduct }: Props) => {
  return (
    <div
      className='grid grid-cols-2 border border-l-4 border-gray-400 bg-gray-200 cursor-pointer rounded-md p-2 hover:border-blue-400'
      onClick={() => handleSelectProduct(product)}
    >
      <div className='col-span-1 flex items-center'>
        {product.favorite && (
          <Icon
            icon='material-symbols-light:star-rounded'
            className='text-amber-500 text-2xl'
          />
        )}
        {product.productName}
      </div>
    </div>
  );
};
