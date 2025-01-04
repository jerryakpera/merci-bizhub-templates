import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { Sale } from './sales-types';

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  try {
    const salesRef = collection(db, 'sales');
    const salesSnapshot = await getDocs(salesRef);
    const salesList = salesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return salesList as Sale[];
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw new Error('Failed to fetch sales');
  }
});

export const saveSale = createAsyncThunk(
  'sales/saveSale',
  async (newSale: Sale, { rejectWithValue }) => {
    try {
      const salesRef = collection(db, 'sales');
      const docRef = await addDoc(salesRef, newSale);
      const { id, ...saleData } = newSale;
      if (!id) {
        console.log('');
      }
      const savedSale = { id: docRef.id, ...saleData }; // Adding the Firestore document ID to the sale
      return savedSale;
    } catch (error) {
      console.error('Error saving sale:', error);
      return rejectWithValue('Failed to save the sale');
    }
  }
);

export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async (updatedSale: Partial<Sale>, { rejectWithValue }) => {
    try {
      if (!updatedSale.id) {
        return rejectWithValue('Sale ID is required for update');
      }

      const saleDocRef = doc(db, 'sales', updatedSale.id);
      await updateDoc(saleDocRef, updatedSale);

      return { ...updatedSale, id: updatedSale.id };
    } catch (error) {
      console.error('Error updating sale:', error);
      return rejectWithValue('Failed to update the sale');
    }
  }
);

export const deleteSale = createAsyncThunk(
  'sales/deleteSale',
  async (saleId: string, { rejectWithValue }) => {
    try {
      const saleDocRef = doc(db, 'sales', saleId);
      await deleteDoc(saleDocRef);
      return saleId;
    } catch (error) {
      console.error('Error deleting sale:', error);
      return rejectWithValue('Failed to delete the sale');
    }
  }
);

export const deleteSalesByIds = createAsyncThunk(
  'sales/deleteSalesByIds',
  async (saleIds: string[], { rejectWithValue }) => {
    try {
      const batch = writeBatch(db);

      saleIds.forEach((saleId) => {
        const saleDocRef = doc(db, 'sales', saleId);
        batch.delete(saleDocRef);
      });

      await batch.commit();
      return saleIds;
    } catch (error) {
      console.error('Error deleting sales:', error);
      return rejectWithValue('Failed to delete the sales');
    }
  }
);
