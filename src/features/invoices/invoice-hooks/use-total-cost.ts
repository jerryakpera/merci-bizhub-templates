import { useEffect, useState } from 'react';

import { SelectedProduct } from '@/features/invoices/invoice-types';

export const useTotalCost = (
  selectedProducts: SelectedProduct[],
  genIsOn: boolean
): number => {
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const newTotalCost = selectedProducts.reduce(
      (sum, { product, quantity, customPrice }) =>
        sum +
        quantity *
          (customPrice ??
            (genIsOn && product.genPrice ? product.genPrice : product.price)),
      0
    );
    setTotalCost(newTotalCost);
  }, [selectedProducts, genIsOn]);

  return totalCost;
};

export default useTotalCost;
