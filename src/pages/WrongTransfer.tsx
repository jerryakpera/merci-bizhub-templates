import { useState } from 'react';

import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import Docxtemplater from 'docxtemplater';
import expressionParser from 'docxtemplater/expressions';

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

  const generateDocument = (file: File | null, data: WrongTransferFormData) => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event: ProgressEvent<FileReader>) {
      if (event.target && event.target.result) {
        const content = new Uint8Array(event.target.result as ArrayBuffer);
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          parser: expressionParser,
        });
        doc.render({
          gender: capitalizeEveryWord(data.gender),
          state: capitalizeEveryWord(data.state),
          lga: capitalizeEveryWord(data.lga),
          religion: capitalizeEveryWord(data.religion),
          nationality: capitalizeEveryWord(data.nationality),

          amount: data.amount,
          amountInWords: capitalizeEveryWord(data.amountInWords),
          transactionMethod: capitalizeEveryWord(data.transactionMethod),

          dateOfOrderInWords: data.dateOfOrderInWords?.toUpperCase(),
          dateOfOrder: format(data?.dateOfOrder || new Date(), 'dd/MM/yyyy'),

          dateOfTransactionInWords: data.dateOfTransactionInWords,
          dateOfTransaction: format(
            data?.dateOfTransaction || new Date(),
            'dd/MM/yyyy'
          ),

          sender: data.sender.toUpperCase(),
          sendersAccountNo: data.sendersAccountNo,
          sendersBank: data.sendersBank.toUpperCase(),

          recipient: data.recipient.toUpperCase(),
          recipientsBank: data.recipientsBank.toUpperCase(),
          recipientsAccountNo: data.recipientsAccountNo,

          intendedRecipient: data.intendedRecipient.toUpperCase(),
          intendedRecipientsBank: data.intendedRecipientsBank.toUpperCase(),
          intendedRecipientsAccountNo: data.intendedRecipientsAccountNo,
        });
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        saveAs(out, `${data.outputFileName || 'Affidavit'}.docx`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFormSubmit = (formData: WrongTransferFormData) => {
    generateDocument(selectedFile, formData);
  };

  return (
    <div className='p-2'>
      <WrongTransferForm
        setSelectedFile={setSelectedFile}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};
