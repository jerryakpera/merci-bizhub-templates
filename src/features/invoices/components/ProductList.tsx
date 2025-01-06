import { Product } from '@/features/products/products-types';
import { ProductRow } from '@/features/invoices/components/ProductRow';

type Props = {
  filteredProducts: Product[];
  handleSelectProduct: (val: Product) => void;
};

export const ProductList = ({
  filteredProducts,
  handleSelectProduct,
}: Props) => (
  <div className='space-y-2'>
    {filteredProducts.map((product) => (
      <ProductRow
        key={product.id}
        product={product}
        handleSelectProduct={handleSelectProduct}
      />
    ))}
  </div>
);

export default ProductList;
