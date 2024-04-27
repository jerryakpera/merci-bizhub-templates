import { useState } from 'react';

import { Button } from '@/components/ui/button';

import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import PizZipUtils from 'pizzip/utils/index.js';
import expressionParser from 'docxtemplater/expressions';
import { AffidavitDetailsForm } from './AffidavitDetailsForm';
import { AffidavitFormData } from './interfaces';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function capitalizeEveryWord(sentence: string): string {
  // Check if the sentence is empty or null
  if (!sentence) return '';

  // Split the sentence into an array of words
  const words = sentence.split(' ');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    // Check if the word is empty or null
    if (!word) return '';

    // Capitalize the first letter and concatenate it with the rest of the word
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a sentence
  return capitalizedWords.join(' ');
}

export const WrongTransferAffidavitCourt4 = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const generateDocument = (file: File | null, data: AffidavitFormData) => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const content = new Uint8Array(this.result);
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

        amountInNo: data.amountInNo,
        dateInWords: capitalizeEveryWord(data.dateInWords),
        amountInWords: capitalizeEveryWord(data.amountInWords),

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
      }); //Output the document using Data-URI
      saveAs(out, `${data.outputFileName || 'Affidavit'}.docx`);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFormSubmit = (formData: AffidavitFormData) => {
    generateDocument(selectedFile, formData);
  };

  return (
    <div className='p-2'>
      <AffidavitDetailsForm
        setSelectedFile={setSelectedFile}
        handleFormSubmit={handleFormSubmit}
      />
      {/* <h1>Test docxtemplater</h1> */}
      {/* <input
        type='file'
        onChange={handleFileChange}
      /> */}
      {/* <Button onClick={generateDocument}>Generate document</Button>
      <p>Click the button above to generate a document using ReactJS</p>
      <p>
        You can edit the data in your code in this example. In your app, the
        data would come from your database for example.
      </p> */}
    </div>
  );
};
