import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sale } from './sales-types';

interface SalesState {
  sales: Sale[];
}

const initialState: SalesState = {
  sales: [],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addSale: (state, action: PayloadAction<Sale>) => {
      state.sales.push(action.payload);
    },
    removeSale: (state, action: PayloadAction<string>) => {
      state.sales = state.sales.filter((sale) => sale.id !== action.payload);
    },
    updateSale: (state, action: PayloadAction<Sale>) => {
      const index = state.sales.findIndex(
        (sale) => sale.id === action.payload.id
      );
      if (index !== -1) {
        state.sales[index] = action.payload;
      }
    },
  },
});

export const { addSale, removeSale, updateSale } = salesSlice.actions;

export default salesSlice.reducer;
