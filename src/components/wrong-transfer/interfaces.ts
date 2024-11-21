export type WrongTransferFormData = {
  // Document details
  dateOfOrder?: Date;
  dateOfOrderInWords?: string;

  // File details
  outputFileName?: string;

  // Transaction details
  amount?: string;
  amountInWords: string;
  dateOfTransaction: Date;
  transactionMethod: string;
  dateOfTransactionInWords: string;

  // Location details
  lga: string;
  state: string;
  nationality: string;

  // Senders details
  gender: string;
  religion: string;
  sender: string;
  sendersBank: string;
  sendersAccountNo: string;

  // Recipients details
  recipient: string;
  recipientsBank: string;
  recipientsAccountNo: string;

  // Intended recipients details
  intendedRecipient: string;
  intendedRecipientsAccountNo: string;
  intendedRecipientsBank: string;

  transactionId?: string;
  tellerId?: string;
};
