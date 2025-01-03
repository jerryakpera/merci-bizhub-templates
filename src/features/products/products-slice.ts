import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceStatusType } from '../types';
import { Product } from './products-types';

import {
  deleteProduct,
  fetchProducts,
  saveProduct,
  updateProduct,
} from './products-thunk';

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
      })
      // Handle saveProduct thunk
      .addCase(saveProduct.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        saveProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.products = action.payload;
        }
      )
      .addCase(saveProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle updateProduct thunk
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.products = action.payload;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle deleteProduct thunk
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.products = action.payload;
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;

export default productsSlice.reducer;
