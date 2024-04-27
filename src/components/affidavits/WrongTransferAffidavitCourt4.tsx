import React, { useState } from 'react';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import PizZipUtils from 'pizzip/utils/index.js';
import expressionParser from 'docxtemplater/expressions';

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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const generateDocument = () => {
    if (!selectedFile) {
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
        gender: capitalizeEveryWord('male'),
        state: capitalizeEveryWord('plateau'),
        lga: capitalizeEveryWord('jos north'),
        religion: capitalizeEveryWord('christian'),
        nationality: capitalizeEveryWord('nigerian'),

        amountInNo: '10,000',
        dateInWords: '27th April 2024',
        amountInWords: capitalizeEveryWord('ten thousand naira'),

        sender: 'Jeremiah Akpera'.toUpperCase(),
        sendersAccountNo: '2171614013',
        sendersBank: 'UBA'.toUpperCase(),

        recipient: 'Israel Akpera'.toUpperCase(),
        recipientsBank: 'FCMB'.toUpperCase(),
        recipientsAccountNo: '00104452236',

        intendedRecipient: 'Patience Akpera'.toUpperCase(),
        intendedRecipientsAccountNo: '2200023654',
        intendedRecipientsBank: 'GTB'.toUpperCase(),
      });
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      }); //Output the document using Data-URI
      saveAs(out, 'output.docx');
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className='p-2'>
      <h1>Test docxtemplater</h1>
      <input
        type='file'
        onChange={handleFileChange}
      />
      <button onClick={generateDocument}>Generate document</button>
      <p>Click the button above to generate a document using ReactJS</p>
      <p>
        You can edit the data in your code in this example. In your app, the
        data would come from your database for example.
      </p>
    </div>
  );
};
