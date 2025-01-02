// Type options for the payment status
export type PaymentStatus = 'paid' | 'pending';

// Type options for the payment method
export type PaymentMethod = 'cash' | 'card' | 'transfer';

export interface Sale {
  id: string;
  date: number;
  staff: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  productName: string;
  customerName: string;
  paymentStatus: string;
  paymentMethod: string;
  outstandingBalance: number;
}

// Create options for the payment status dropdown
export const paymentStatusOptions = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
];

// Create options for the payment method dropdown
export const paymentMethodOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'transfer', label: 'Transfer' },
];
