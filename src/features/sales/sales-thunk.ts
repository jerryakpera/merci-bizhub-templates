import { localStorageHelper } from '@/lib/local-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Sale } from './sales-types';

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const sales = localStorageHelper.getItem<Sale[]>(localStorageHelper.salesKey);
  return sales || [];
});

export const saveSale = createAsyncThunk(
  'sales/saveSale',
  async (newSale: Sale, { rejectWithValue }) => {
    try {
      // Fetch existing sales from local storage
      const sales =
        localStorageHelper.getItem<Sale[]>(localStorageHelper.salesKey) || [];

      // Add the new sale to the list
      const updatedSales = [...sales, newSale];

      // Save the updated list back to local storage
      localStorageHelper.setItem(localStorageHelper.salesKey, updatedSales);

      return updatedSales;
    } catch (error) {
      // Handle any errors
      return rejectWithValue('Failed to save the sale');
    }
  }
);

export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async (updatedSale: Partial<Sale>, { rejectWithValue }) => {
    try {
      // Fetch existing sales from local storage
      const sales =
        localStorageHelper.getItem<Sale[]>(localStorageHelper.salesKey) || [];

      // Find the index of the sale to update
      const saleIndex = sales.findIndex((sale) => sale.id === updatedSale.id);

      if (saleIndex === -1) {
        return rejectWithValue('Sale not found');
      }

      // Update the sale at the found index
      sales[saleIndex] = {
        ...sales[saleIndex],
        ...updatedSale,
        updatedAt: Date.now(), // Update the timestamp
      };

      // Save the updated list back to local storage
      localStorageHelper.setItem(localStorageHelper.salesKey, sales);

      return sales;
    } catch (error) {
      // Handle any errors
      return rejectWithValue('Failed to update the sale');
    }
  }
);

export const deleteSale = createAsyncThunk(
  'sales/deleteSale',
  async (saleId: string, { rejectWithValue }) => {
    try {
      // Fetch existing sales from local storage
      const sales =
        localStorageHelper.getItem<Sale[]>(localStorageHelper.salesKey) || [];

      // Filter out the sale to be deleted
      const updatedSales = sales.filter((sale) => sale.id !== saleId);

      if (sales.length === updatedSales.length) {
        return rejectWithValue('Sale not found');
      }

      // Save the updated list back to local storage
      localStorageHelper.setItem(localStorageHelper.salesKey, updatedSales);

      return updatedSales;
    } catch (error) {
      // Handle any errors
      return rejectWithValue('Failed to delete the sale');
    }
  }
);
