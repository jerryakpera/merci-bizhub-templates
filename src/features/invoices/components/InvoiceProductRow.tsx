import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NairaSign } from '@/components/global';
import { Product } from '@/features/products/products-types';

type Props = {
  price: number;
  total: number;
  product: Product;
  quantity: number;
  onIncrement: (productId: string, value: number) => void;
  onDecrement: (productId: string, value: number) => void;
  onPriceChange: (productId: string, newPrice: number) => void;
};

export const InvoiceProductRow = ({
  price,
  total,
  product,
  quantity,
  onIncrement,
  onDecrement,
  onPriceChange,
}: Props) => {
  const [editablePrice, setEditablePrice] = useState<number>(price);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPrice = parseFloat(e.target.value) || 0;
    setEditablePrice(newPrice);
    onPriceChange(product.id, newPrice);
  };

  return (
    <div className='border-blue-600 border-l-4 rounded-sm p-3 bg-blue-200 space-y-2'>
      <h3 className='text-blue-700 text-md font-bold'>{product.productName}</h3>
      <div className='flex items-center justify-between'>
        <div className='flex justify-start gap-x-2'>
          <Button
            size='sm'
            onClick={() => onDecrement(product.id, 1)}
          >
            -1
          </Button>
          <Button
            size='sm'
            onClick={() => onDecrement(product.id, 5)}
          >
            -5
          </Button>
          <Button
            size='sm'
            onClick={() => onDecrement(product.id, 10)}
          >
            -10
          </Button>
        </div>
        <div className='text-blue-700 text-xl font-light flex gap-x-1.5 items-center'>
          <div>{quantity}</div>
          <div>x</div>
          <div className='flex items-center gap-x-1'>
            <NairaSign />
            <input
              type='number'
              value={editablePrice.toFixed(2)}
              onChange={handlePriceChange}
              className='border rounded p-1 w-20 text-sm text-green-700 font-bold text-right'
            />
          </div>
          <div>=</div>
          <div>
            <NairaSign />
            {total.toFixed(2)}
          </div>
        </div>
        <div className='flex justify-end gap-x-2'>
          <Button
            size='sm'
            onClick={() => onIncrement(product.id, 1)}
          >
            +1
          </Button>
          <Button
            size='sm'
            onClick={() => onIncrement(product.id, 5)}
          >
            +5
          </Button>
          <Button
            size='sm'
            onClick={() => onIncrement(product.id, 10)}
          >
            +10
          </Button>
        </div>
      </div>
    </div>
  );
};
