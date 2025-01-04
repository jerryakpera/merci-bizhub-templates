import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sale } from './sales-types';
import { SliceStatusType } from '../types';

import {
  saveSale,
  fetchSales,
  updateSale,
  deleteSale,
  deleteSalesByIds,
} from './sales-thunk';
import { RootState } from '@/app/stores';

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
        state.status = 'succeeded';
        state.error = undefined;
        state.sales = action.payload; // Replace sales with the fetched list
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
      .addCase(saveSale.fulfilled, (state, action: PayloadAction<Sale>) => {
        state.status = 'succeeded';
        state.error = undefined;
        state.sales.push(action.payload); // Add the new sale to the list
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
      .addCase(
        updateSale.fulfilled,
        (state, action: PayloadAction<Partial<Sale>>) => {
          state.status = 'succeeded';
          state.error = undefined;
          const index = state.sales.findIndex(
            (sale) => sale.id === action.payload.id
          );
          if (index !== -1) {
            state.sales[index] = {
              ...state.sales[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(updateSale.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle deleteSale thunk
      .addCase(deleteSale.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteSale.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.error = undefined;
        state.sales = state.sales.filter((sale) => sale.id !== action.payload); // Remove the deleted sale
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle deleteSalesByIds thunk
      .addCase(deleteSalesByIds.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        deleteSalesByIds.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.sales = state.sales.filter(
            (sale) => !action.payload.includes(sale.id)
          ); // Remove the deleted sales
        }
      )
      .addCase(deleteSalesByIds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectSalesStatus = (state: RootState) => state.sales.status;
export const selectSales = (state: { sales: SalesState }) => state.sales.sales;

export default salesSlice.reducer;
