import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceStatusType } from '../types';
import { Sale } from './sales-types';

import { fetchSales, saveSale, updateSale, deleteSale } from './sales-thunk';

interface SalesState {
  sales: Sale[];
  status: SliceStatusType;
  error: string | undefined;
}

const initialState: SalesState = {
  sales: [],
  status: 'idle',
  error: undefined,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchSales thunk
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchSales.fulfilled, (state, action: PayloadAction<Sale[]>) => {
        state.error = undefined;
        state.status = 'succeeded';
        state.sales = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle saveSale thunk
      .addCase(saveSale.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(saveSale.fulfilled, (state, action: PayloadAction<Sale[]>) => {
        state.status = 'succeeded';
        state.error = undefined;
        state.sales = action.payload;
      })
      .addCase(saveSale.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle updateSale thunk
      .addCase(updateSale.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(updateSale.fulfilled, (state, action: PayloadAction<Sale[]>) => {
        state.status = 'succeeded';
        state.error = undefined;
        state.sales = action.payload;
      })
      .addCase(updateSale.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle deleteSale thunk
      .addCase(deleteSale.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteSale.fulfilled, (state, action: PayloadAction<Sale[]>) => {
        state.status = 'succeeded';
        state.error = undefined;
        state.sales = action.payload;
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectSales = (state: { sales: SalesState }) => state.sales.sales;

export default salesSlice.reducer;
