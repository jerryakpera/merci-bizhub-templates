// Type options for the payment status
export type PaymentStatus = 'Paid' | 'Pending';

// Type options for the payment method
export type PaymentMethod = 'Cash' | 'Card' | 'Transfer';

export interface Sale {
  id: string;
  paid: number;
  quantity: number;
  unitCost: number;
  totalCost: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  firebaseId?: string;
  productName: string;
  customerName: string;
  outstandingBalance: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
}

// Create options for the payment status dropdown
export const paymentStatusOptions = ['Paid', 'Pending'];

// Create options for the payment method dropdown
export const paymentMethodOptions = ['Cash', 'Card', 'Transfer'];
