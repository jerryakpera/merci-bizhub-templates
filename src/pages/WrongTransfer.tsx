import { useState } from 'react';

import { format } from 'date-fns';

import { generateDocument } from '@/utils';
import { WrongTransferForm } from '@/components/wrong-transfer';
import { WrongTransferFormData } from '@/components/wrong-transfer/interfaces';

function capitalizeEveryWord(sentence: string): string {
  if (!sentence) return '';

  const words = sentence.split(' ');

  const capitalizedWords = words.map((word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(' ');
}

export const WrongTransfer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFormSubmit = (formData: WrongTransferFormData) => {
    const data = {
      gender: capitalizeEveryWord(formData.gender),
      state: capitalizeEveryWord(formData.state),
      lga: capitalizeEveryWord(formData.lga),
      religion: capitalizeEveryWord(formData.religion),
      nationality: capitalizeEveryWord(formData.nationality),

      amount: formData.amount,
      amountInWords: capitalizeEveryWord(formData.amountInWords),
      transactionMethod: capitalizeEveryWord(formData.transactionMethod),

      dateOfOrderInWords: formData.dateOfOrderInWords?.toUpperCase(),
      dateOfOrder: format(formData?.dateOfOrder || new Date(), 'dd/MM/yyyy'),

      dateOfTransactionInWords: formData.dateOfTransactionInWords,
      dateOfTransaction: format(
        formData?.dateOfTransaction || new Date(),
        'dd/MM/yyyy'
      ),

      tellerId: formData.tellerId,
      transactionId: formData.transactionId,

      sender: formData.sender.toUpperCase(),
      sendersAccountNo: formData.sendersAccountNo,
      sendersBank: formData.sendersBank.toUpperCase(),

      recipient: formData.recipient.toUpperCase(),
      recipientsBank: formData.recipientsBank.toUpperCase(),
      recipientsAccountNo: formData.recipientsAccountNo,

      intendedRecipient: formData.intendedRecipient.toUpperCase(),
      intendedRecipientsBank: formData.intendedRecipientsBank.toUpperCase(),
      intendedRecipientsAccountNo: formData.intendedRecipientsAccountNo,
    };

    generateDocument(selectedFile, formData.outputFileName, data);
  };

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4 font-bold'>
        Generate court documents for a wrong transfer
      </h1>
      <WrongTransferForm
        setSelectedFile={setSelectedFile}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};
