import { localStorageHelper } from '@/lib/local-storage';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from './products-types';
import { sampleProducts } from './products-data';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    let products = localStorageHelper.getItem<Product[]>(
      localStorageHelper.productsKey
    );

    if (!products) {
      localStorageHelper.setItem(
        localStorageHelper.productsKey,
        sampleProducts
      );
      products = localStorageHelper.getItem<Product[]>(
        localStorageHelper.productsKey
      );
    }

    return products || [];
  }
);
