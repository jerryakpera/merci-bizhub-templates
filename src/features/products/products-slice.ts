import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceStatusType } from '../types';
import { Product } from './products-types';

import { fetchProducts } from './products-thunk';

interface ProductsState {
  products: Product[];
  status: SliceStatusType;
  error: string | undefined;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: undefined,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.error = undefined;
          state.status = 'succeeded';
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;

export default productsSlice.reducer;
