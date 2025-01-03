import { localStorageHelper } from '@/lib/local-storage';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from './products-types';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = localStorageHelper.getItem<Product[]>(
      localStorageHelper.productsKey
    );

    return products || [];
  }
);

export const saveProduct = createAsyncThunk(
  'products/saveProduct',
  async (newProduct: Product, { rejectWithValue }) => {
    try {
      // Fetch existing products from local storage
      const products =
        localStorageHelper.getItem<Product[]>(localStorageHelper.productsKey) ||
        [];

      // Add the new product to the list
      const updatedProducts = [...products, newProduct];

      // Save the updated list back to local storage
      localStorageHelper.setItem(
        localStorageHelper.productsKey,
        updatedProducts
      );

      return updatedProducts;
    } catch (error) {
      // Handle any errors
      return rejectWithValue('Failed to save the product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updatedProduct: Partial<Product>, { rejectWithValue }) => {
    try {
      // Fetch existing products from local storage
      const products =
        localStorageHelper.getItem<Product[]>(localStorageHelper.productsKey) ||
        [];

      // Find the index of the product to update
      const productIndex = products.findIndex(
        (product) => product.id === updatedProduct.id
      );

      if (productIndex === -1) {
        return rejectWithValue('Product not found');
      }

      // Update the product at the found index
      products[productIndex] = {
        ...products[productIndex],
        ...updatedProduct,
        updatedAt: Date.now(), // Update the timestamp
      };

      // Save the updated list back to local storage
      localStorageHelper.setItem(localStorageHelper.productsKey, products);

      return products;
    } catch (error) {
      // Handle any errors
      return rejectWithValue('Failed to update the product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      // Fetch existing products from local storage
      const products =
        localStorageHelper.getItem<Product[]>(localStorageHelper.productsKey) ||
        [];

      // Filter out the product to be deleted
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );

      if (products.length === updatedProducts.length) {
        return rejectWithValue('Product not found');
      }

      // Save the updated list back to local storage
      localStorageHelper.setItem(
        localStorageHelper.productsKey,
        updatedProducts
      );

      return updatedProducts;
    } catch (error) {
      // Handle any errors
      return rejectWithValue('Failed to delete the product');
    }
  }
);
