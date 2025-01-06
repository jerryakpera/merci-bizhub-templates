import { Product } from '@/features/products/products-types';

import {
  Sale,
  PaymentMethod,
  PaymentStatus,
} from '@/features/sales/sales-types';

// Type definition for an invoice
export type Invoice = {
  id: string;
  totalCost: number;
  totalPaid: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  firebaseId?: string;
  customerName: string;
  sales: Partial<Sale>[];
  outstandingBalance: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
};

export interface SelectedProduct {
  product: Product;
  quantity: number;
  customPrice?: number;
}

// Options for dropdowns or enums related to invoices
export const invoicePaymentStatusOptions = ['Paid', 'Pending'];
export const invoicePaymentMethodOptions = ['Cash', 'Card', 'Transfer'];
