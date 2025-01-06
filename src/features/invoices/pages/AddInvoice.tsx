import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';

import { AuthContext } from '@/contexts/AuthContext';
import { selectGenIsOn, toggleGenIsOn } from '@/features/sales/sales-slice';

import { Product } from '@/features/products/products-types';
import { Invoice, SelectedProduct } from '@/features/invoices/invoice-types';

import {
  InvoiceForm,
  ProductList,
  InvoiceSummary,
  SelectedProductsList,
} from '@/features/invoices/components';
import { useToast } from '@/hooks/use-toast';

import {
  useTotalCost,
  useFilteredProducts,
} from '@/features/invoices/invoice-hooks';
import { selectProducts } from '@/features/products/products-slice';
import { PaymentMethod, PaymentStatus } from '@/features/sales/sales-types';
import { AppDispatch } from '@/app/stores';
import { saveInvoice } from '../invoice-thunk';

interface AddInvoiceProps {}

export const AddInvoice: React.FC<AddInvoiceProps> = () => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const genIsOn = useSelector(selectGenIsOn);
  const products = useSelector(selectProducts);

  const [filter, setFilter] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('Pending');

  const filteredProducts = useFilteredProducts(filter, products);
  const totalCost = useTotalCost(selectedProducts, genIsOn);

  const handleSelectProduct = (product: Product): void => {
    if (!selectedProducts.find((p) => p.product.id === product.id)) {
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }]);
    }

    setFilter('');
  };

  const handleIncrement = (productId: string, value: number): void => {
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + value }
          : item
      )
    );
  };

  const handleDecrement = (productId: string, value: number): void => {
    setSelectedProducts((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - value }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handlePriceChange = (productId: string, newPrice: number): void => {
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, customPrice: newPrice }
          : item
      )
    );
  };

  const handleTotalPaidChange = (newPaidAmount: number): void => {
    setTotalPaid(newPaidAmount);
  };

  const handleGenerateInvoice = (): void => {
    const sales = selectedProducts.map((selectedProduct) => {
      const currentTimestamp = Date.now();

      const { product, quantity, customPrice } = selectedProduct;
      const unitCost =
        customPrice ??
        (genIsOn && product.genPrice ? product.genPrice : product.price);
      const totalCost = unitCost * quantity;

      return {
        quantity,
        unitCost,
        totalCost,
        id: String(currentTimestamp),
        productName: product.productName,
      };
    });

    const totalCost = sales.reduce((sum, sale) => sum + sale.totalCost, 0);
    const outstandingBalance = totalCost - totalPaid;

    const invoice: Invoice = {
      id: `${new Date().getTime()}`,
      totalCost,
      totalPaid,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      createdBy: user?.email ?? 'guest',
      updatedBy: user?.email ?? 'guest',
      customerName,
      sales,
      outstandingBalance,
      paymentMethod,
      paymentStatus,
    };

    // Log the invoice object to the console
    console.log('Generated Invoice:', invoice);

    // Here, you can add your code to save the invoice to the database
    // Dispatch the saveInvoice thunk to save the invoice to Firestore

    if (confirm('Save this invoice?')) {
      dispatch(saveInvoice(invoice))
        .then((action) => {
          if (action.type === 'invoices/saveInvoice/fulfilled') {
            toast({
              title: 'Invoice saved successfully',
            });
          } else if (action.type === 'invoices/saveInvoice/rejected') {
            toast({
              title: 'Failed to save invoice',
            });
            console.error('Failed to save invoice:', action.payload);
          }
        })
        .catch((error) => {
          toast({
            title: 'Failed to save invoice',
          });
          console.error('Error saving invoice:', error);
        });
    }
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center space-x-2 justify-end'>
        <Button onClick={() => dispatch(toggleGenIsOn())}>
          {genIsOn ? 'Gen' : 'NEPA'}
        </Button>
      </div>

      {selectedProducts.length > 0 && (
        <InvoiceForm
          customerName={customerName}
          setCustomerName={setCustomerName}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
        />
      )}

      {selectedProducts.length > 0 && (
        <SelectedProductsList
          genIsOn={genIsOn}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          selectedProducts={selectedProducts}
          handlePriceChange={handlePriceChange}
        />
      )}

      {selectedProducts.length > 0 && (
        <InvoiceSummary
          totalCost={totalCost}
          totalPaid={totalPaid}
          customerName={customerName}
          selectedProducts={selectedProducts}
          outstandingBalance={totalCost - totalPaid}
          handleTotalPaidChange={handleTotalPaidChange}
          handleGenerateInvoice={handleGenerateInvoice}
        />
      )}

      {/* Add input for filtering products */}
      <div>
        <input
          type='text'
          placeholder='Filter products'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='w-full p-2 border rounded-md'
        />
      </div>

      <ProductList
        filteredProducts={filteredProducts}
        handleSelectProduct={handleSelectProduct}
      />
    </div>
  );
};
