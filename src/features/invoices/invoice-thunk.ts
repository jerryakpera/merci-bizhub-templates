import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  doc,
  query,
  where,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
  collection,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { Invoice } from './invoice-types';

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async () => {
    try {
      const invoicesRef = collection(db, 'invoices');
      const invoicesSnapshot = await getDocs(invoicesRef);
      const invoicesList = invoicesSnapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));
      return invoicesList as Invoice[];
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw new Error('Failed to fetch invoices');
    }
  }
);

export const saveInvoice = createAsyncThunk(
  'invoices/saveInvoice',
  async (newInvoice: Invoice, { rejectWithValue }) => {
    try {
      const invoicesRef = collection(db, 'invoices');
      const docRef = await addDoc(invoicesRef, newInvoice);
      const { ...invoiceData } = newInvoice;
      const savedInvoice = { firebaseId: docRef.id, ...invoiceData };

      return savedInvoice;
    } catch (error) {
      console.error('Error saving invoice:', error);
      return rejectWithValue('Failed to save the invoice');
    }
  }
);

export const updateInvoice = createAsyncThunk(
  'invoices/updateInvoice',
  async (updatedInvoice: Partial<Invoice>, { rejectWithValue }) => {
    try {
      const { firebaseId } = updatedInvoice;

      if (!firebaseId) {
        return rejectWithValue('Invoice ID is required for update');
      }

      const invoiceDocRef = doc(db, 'invoices', firebaseId);
      await updateDoc(invoiceDocRef, updatedInvoice);

      return { ...updatedInvoice, firebaseId: firebaseId };
    } catch (error) {
      console.error('Error updating invoice:', error);
      return rejectWithValue('Failed to update the invoice');
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  'invoices/deleteInvoice',
  async (invoiceId: string, { rejectWithValue }) => {
    try {
      const invoiceDocRef = doc(db, 'invoices', invoiceId);
      await deleteDoc(invoiceDocRef);
      return invoiceId;
    } catch (error) {
      console.error('Error deleting invoice:', error);
      return rejectWithValue('Failed to delete the invoice');
    }
  }
);

export const deleteInvoicesByIds = createAsyncThunk(
  'invoices/deleteInvoicesByIds',
  async (invoiceIds: string[], { rejectWithValue }) => {
    try {
      console.log('Invoice IDs to delete:', invoiceIds);

      // Create a Firestore query to fetch documents with matching IDs
      const invoicesCollectionRef = collection(db, 'invoices');
      const invoicesQuery = query(
        invoicesCollectionRef,
        where('id', 'in', invoiceIds) // Assuming 'id' is the field storing invoice IDs
      );

      // Fetch documents matching the query
      const invoicesSnapshot = await getDocs(invoicesQuery);

      // Create a Firestore batch for deletion
      const batch = writeBatch(db);

      // Add each document to the batch for deletion
      invoicesSnapshot.forEach((doc) => {
        console.log(`Deleting invoice with ID: ${doc.id}`);
        batch.delete(doc.ref);
      });

      // Commit the batch
      await batch.commit();
      console.log('Batch deletion successful');
      return invoiceIds; // Return the list of deleted IDs
    } catch (error) {
      console.error('Error deleting invoices:', error);
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || 'Failed to delete the invoices'
        );
      }
      return rejectWithValue('Failed to delete the invoices');
    }
  }
);

// Add this new thunk to fetch a single invoice by its firebaseId
export const fetchInvoiceById = createAsyncThunk(
  'invoices/fetchInvoiceById',
  async (firebaseId: string, { rejectWithValue }) => {
    try {
      const invoiceDocRef = doc(db, 'invoices', firebaseId);
      const invoiceDocSnapshot = await getDoc(invoiceDocRef);

      if (!invoiceDocSnapshot.exists()) {
        return rejectWithValue('Invoice not found');
      }

      const invoiceData = {
        firebaseId: invoiceDocSnapshot.id,
        ...invoiceDocSnapshot.data(),
      };

      return invoiceData as Invoice;
    } catch (error) {
      console.error('Error fetching invoice:', error);
      return rejectWithValue('Failed to fetch the invoice');
    }
  }
);
