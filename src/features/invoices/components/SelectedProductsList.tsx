import { Product } from '@/features/products/products-types';
import { InvoiceProductRow } from '@/features/invoices/components/InvoiceProductRow';

type SelectedProduct = {
  product: Product;
  quantity: number;
  customPrice?: number;
};

type Props = {
  genIsOn: boolean;
  selectedProducts: SelectedProduct[];
  handleIncrement: (productId: string, value: number) => void;
  handleDecrement: (productId: string, value: number) => void;
  handlePriceChange: (productId: string, newPrice: number) => void;
};

export const SelectedProductsList = ({
  selectedProducts,
  genIsOn,
  handleIncrement,
  handleDecrement,
  handlePriceChange,
}: Props) => (
  <div className='space-y-2'>
    {selectedProducts.map(({ product, quantity, customPrice }) => (
      <InvoiceProductRow
        key={product.id}
        price={
          customPrice ||
          (genIsOn && product.genPrice ? product.genPrice : product.price)
        }
        total={
          quantity *
          (customPrice ||
            (genIsOn && product.genPrice ? product.genPrice : product.price))
        }
        quantity={quantity}
        product={product}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onPriceChange={handlePriceChange}
      />
    ))}
  </div>
);

export default SelectedProductsList;
