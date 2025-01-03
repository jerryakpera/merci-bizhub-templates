import { format } from 'date-fns';

import { NairaSign } from '@/components/global';
import { Product } from '@/features/products/products-types';

type Props = {
  product: Product;
};

export const SingleProduct = ({ product }: Props) => {
  const {
    price,
    category,
    genPrice,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    productName,
  } = product;

  type ProductDetailProps = {
    label: string;
    value: string | number;
  };

  const ProductDetail = ({ label, value }: ProductDetailProps) => {
    return (
      <div className='flex-col -space-y-1'>
        <div className='text-xs text-gray-500 font-medium'>{label}</div>
        <h6 className='font-semibold'>
          {typeof value == 'string' ? (
            value
          ) : (
            <>
              <NairaSign />
              {value}
            </>
          )}
        </h6>
      </div>
    );
  };

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-2'>
        <ProductDetail
          label='Product name'
          value={productName}
        />
        <ProductDetail
          label='Category'
          value={category}
        />
      </div>

      <div className='grid grid-cols-2'>
        <div className='cols-span-1'>
          <ProductDetail
            label='Price'
            value={price}
          />
        </div>
        <div className='cols-span-1'>
          <ProductDetail
            label='Price with gen'
            value={genPrice}
          />
        </div>
      </div>

      <div className='grid grid-cols-2'>
        <div className='cols-span-1'>
          <ProductDetail
            label='Updated by'
            value={updatedBy}
          />
        </div>
        <div className='cols-span-1'>
          <ProductDetail
            label='Last updated'
            value={format(updatedAt, 'do MMM, yyyy')}
          />
        </div>
      </div>

      <div className='grid grid-cols-2'>
        <div className='cols-span-1'>
          <ProductDetail
            label='Created by'
            value={createdBy}
          />
        </div>
        <div className='cols-span-1'>
          <ProductDetail
            label='Created'
            value={format(createdAt, 'do MMM, yyyy')}
          />
        </div>
      </div>
    </div>
  );
};
