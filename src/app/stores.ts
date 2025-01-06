import { configureStore } from '@reduxjs/toolkit';

import salesReducer from '@/features/sales/sales-slice';
import invoicesReducer from '@/features/invoices/invoice-slice';
import productsReducer from '@/features/products/products-slice';

export const store = configureStore({
  reducer: {
    sales: salesReducer,
    invoices: invoicesReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
