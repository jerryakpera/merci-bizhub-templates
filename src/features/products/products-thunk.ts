import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  writeBatch,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { Product } from './products-types';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const productsRef = collection(db, 'products');
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));
      return productsList as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }
);

export const saveProduct = createAsyncThunk(
  'products/saveProduct',
  async (newProduct: Product, { rejectWithValue }) => {
    try {
      const productsRef = collection(db, 'products');
      const docRef = await addDoc(productsRef, newProduct);
      const { id, ...productData } = newProduct;
      if (!id) {
        console.log('');
      }
      const savedProduct = { id: docRef.id, ...productData }; // Adding the Firestore document ID to the product
      return savedProduct;
    } catch (error) {
      console.error('Error saving product:', error);
      return rejectWithValue('Failed to save the product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updatedProduct: Partial<Product>, { rejectWithValue }) => {
    try {
      const { firebaseId } = updatedProduct;
      console.log({ firebaseId });
      if (!firebaseId) {
        return rejectWithValue('Product ID is required for update');
      }

      const productDocRef = doc(db, 'products', firebaseId);
      await updateDoc(productDocRef, updatedProduct);

      return { ...updatedProduct, firebaseId };
    } catch (error) {
      console.error('Error updating product:', error);
      return rejectWithValue('Failed to update the product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const productDocRef = doc(db, 'products', productId);
      await deleteDoc(productDocRef);
      return productId;
    } catch (error) {
      console.error('Error deleting product:', error);
      return rejectWithValue('Failed to delete the product');
    }
  }
);

export const deleteProductsByIds = createAsyncThunk(
  'products/deleteProductsByIds',
  async (productIds: string[], { rejectWithValue }) => {
    try {
      const batch = writeBatch(db);

      productIds.forEach((productId) => {
        const productDocRef = doc(db, 'products', productId);
        batch.delete(productDocRef);
      });

      await batch.commit();
      return productIds;
    } catch (error) {
      console.error('Error deleting products:', error);
      return rejectWithValue('Failed to delete the products');
    }
  }
);
