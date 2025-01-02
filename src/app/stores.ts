import { configureStore } from '@reduxjs/toolkit';

import salesReducer from '@/features/sales/sales-slice';
import productsReducer from '@/features/products/products-slice';

export const store = configureStore({
  reducer: {
    sales: salesReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
