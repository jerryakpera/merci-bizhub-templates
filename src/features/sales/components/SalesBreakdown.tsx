import { NairaSign } from '@/components/global';
import { Sale } from '@/features/sales/sales-types';

type Props = {
  sales: Sale[];
};

// Function to compute totals for each product
const getTotalsByProduct = (sales: Sale[]) => {
  const totals = sales.reduce((acc, sale) => {
    if (!acc[sale.productName]) {
      acc[sale.productName] = { totalQuantity: 0, totalCost: 0 };
    }
    acc[sale.productName].totalQuantity += sale.quantity;
    acc[sale.productName].totalCost += sale.totalCost;
    return acc;
  }, {} as Record<string, { totalQuantity: number; totalCost: number }>);

  // Convert the totals object into an array for easier rendering
  return Object.entries(totals).map(
    ([productName, { totalQuantity, totalCost }]) => ({
      productName,
      totalQuantity,
      totalCost,
    })
  );
};

export const SalesBreakdown = ({ sales }: Props) => {
  const productTotals = getTotalsByProduct(sales);

  // Calculate the overall total
  const overallTotal = productTotals.reduce(
    (sum, product) => sum + product.totalCost,
    0
  );

  return (
    <div className='flex-1 text-sm border border-gray-300 rounded-md'>
      <div className='divide-y divide-gray-300'>
        <div className='p-3 grid grid-cols-3 bg-gray-800 text-white'>
          <div>Product/Service</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        {productTotals.map(
          ({ productName, totalQuantity, totalCost }, index) => (
            <div
              key={index}
              className='p-3 grid grid-cols-3'
            >
              <div>{productName}</div>
              <div className='font-bold'>{totalQuantity}</div>
              <div className='font-bold'>
                <NairaSign />
                {totalCost}
              </div>
            </div>
          )
        )}
        <div className='p-3 grid grid-cols-3 bg-gray-200 font-bold'>
          <div>Overall Total</div>
          <div></div>
          <div>
            <NairaSign />
            {overallTotal}
          </div>
        </div>
      </div>
    </div>
  );
};
