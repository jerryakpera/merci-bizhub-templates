import { useState, useEffect } from 'react';
import { Product } from '@/features/products/products-types';

export const useFilteredProducts = (
  filter: string,
  products: Product[]
): Product[] => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const pin = filter.toLowerCase();
    const results = products
      .filter((product) => product.productName.toLowerCase().includes(pin))
      .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

    setFilteredProducts(results);
  }, [filter, products]);

  return filteredProducts;
};

export default useFilteredProducts;
