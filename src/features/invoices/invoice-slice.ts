import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  saveInvoice,
  fetchInvoices,
  updateInvoice,
  deleteInvoice,
  fetchInvoiceById,
  deleteInvoicesByIds,
} from './invoice-thunk';
import { Invoice } from './invoice-types';
import { RootState } from '@/app/stores';
import { SliceStatusType } from '../types';

interface InvoicesState {
  genIsOn: boolean;
  invoices: Invoice[];
  status: SliceStatusType;
  error: string | undefined;
  invoiceDetail: Invoice | null;
}

const initialState: InvoicesState = {
  invoices: [],
  genIsOn: false,
  status: 'idle',
  error: undefined,
  invoiceDetail: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    toggleGenIsOn(state) {
      state.genIsOn = !state.genIsOn;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchInvoices thunk
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        fetchInvoices.fulfilled,
        (state, action: PayloadAction<Invoice[]>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.invoices = action.payload; // Replace invoices with the fetched list
        }
      )
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message;
      })
      // Handle saveInvoice thunk
      .addCase(saveInvoice.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        saveInvoice.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.invoices.push(action.payload); // Add the new invoice
        }
      )
      .addCase(saveInvoice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle updateInvoice thunk
      .addCase(updateInvoice.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        updateInvoice.fulfilled,
        (state, action: PayloadAction<Partial<Invoice>>) => {
          state.status = 'succeeded';
          state.error = undefined;
          const index = state.invoices.findIndex(
            (invoice) => invoice.id === action.payload.id
          );
          if (index !== -1) {
            state.invoices[index] = {
              ...state.invoices[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(updateInvoice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle deleteInvoice thunk
      .addCase(deleteInvoice.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        deleteInvoice.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.invoices = state.invoices.filter(
            (invoice) => invoice.id !== action.payload
          ); // Remove the deleted invoice
        }
      )
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle deleteInvoicesByIds thunk
      .addCase(deleteInvoicesByIds.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(
        deleteInvoicesByIds.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.invoices = state.invoices.filter(
            (invoice) => !action.payload.includes(invoice.id)
          ); // Remove the deleted invoices
        }
      )
      .addCase(deleteInvoicesByIds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle fetchInvoiceById thunk
      .addCase(fetchInvoiceById.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
        state.invoiceDetail = null;
      })
      .addCase(
        fetchInvoiceById.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.status = 'succeeded';
          state.error = undefined;
          state.invoiceDetail = action.payload;
        }
      )
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.invoiceDetail = null;
      });
  },
});

// Export the toggleGenIsOn action
export const { toggleGenIsOn } = invoicesSlice.actions;

// Selectors
export const selectInvoicesError = (state: RootState) => state.invoices.error;
export const selectInvoicesStatus = (state: RootState) => state.invoices.status;
export const selectInvoices = (state: { invoices: InvoicesState }) =>
  state.invoices.invoices.sort((a, b) => b.createdAt - a.createdAt);
export const selectGenIsOn = (state: { invoices: InvoicesState }) =>
  state.invoices.genIsOn;
export const selectInvoiceDetail = (state: { invoices: InvoicesState }) =>
  state.invoices.invoiceDetail;

export default invoicesSlice.reducer;
