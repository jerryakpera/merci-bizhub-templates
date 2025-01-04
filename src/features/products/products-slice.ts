import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from './products-types';
import { SliceStatusType } from '../types';

import {
  fetchProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
  deleteProductsByIds,
} from './products-thunk';
import { RootState } from '@/app/stores';

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
      // Handle fetchProducts thunk
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.error = undefined;
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
        (state, action: PayloadAction<Product>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.products.push(action.payload); // Add the new product
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
        (state, action: PayloadAction<Partial<Product>>) => {
          state.status = 'succeeded';
          state.error = undefined;
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = {
              ...state.products[index],
              ...action.payload,
            };
          }
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
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          ); // Remove the deleted product
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle deleteProductsByIds thunk
      .addCase(deleteProductsByIds.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        deleteProductsByIds.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.products = state.products.filter(
            (product) => !action.payload.includes(product.id)
          ); // Remove the deleted products
        }
      )
      .addCase(deleteProductsByIds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;

export default productsSlice.reducer;
