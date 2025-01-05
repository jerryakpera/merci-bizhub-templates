import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
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
      firebaseId: doc.id,
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
      const { firebaseId } = updatedSale;

      if (!firebaseId) {
        return rejectWithValue('Sale ID is required for update');
      }

      if (!firebaseId) {
        return rejectWithValue('Sale ID is required for update');
      }

      const saleDocRef = doc(db, 'sales', firebaseId);
      await updateDoc(saleDocRef, updatedSale);

      return { ...updatedSale, firebaseId: firebaseId };
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
      console.log('Sale IDs to delete:', saleIds);

      // Create a Firestore query to fetch documents with matching IDs
      const salesCollectionRef = collection(db, 'sales');
      const salesQuery = query(
        salesCollectionRef,
        where('id', 'in', saleIds) // Assuming 'id' is the field storing sale IDs
      );

      // Fetch documents matching the query
      const salesSnapshot = await getDocs(salesQuery);

      // Create a Firestore batch for deletion
      const batch = writeBatch(db);

      // Add each document to the batch for deletion
      salesSnapshot.forEach((doc) => {
        console.log(`Deleting sale with ID: ${doc.id}`);
        batch.delete(doc.ref);
      });

      // Commit the batch
      await batch.commit();
      console.log('Batch deletion successful');
      return saleIds; // Return the list of deleted IDs
    } catch (error) {
      console.error('Error deleting sales:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to delete the sales');
      }
      return rejectWithValue('Failed to delete the sales');
    }
  }
);
