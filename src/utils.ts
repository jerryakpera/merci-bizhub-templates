import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import expressionParser from 'docxtemplater/expressions';

export const capitalizeEveryWord = (sentence: string): string => {
  if (!sentence) return '';

  const words = sentence.split(' ');

  const capitalizedWords = words.map((word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(' ');
};

export const generateDocument = <T>(
  file: File | null,
  outputFileName: string = 'output',
  data: T
) => {
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
      doc.render(data);
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(out, `${outputFileName}.docx`);
    }
  };

  reader.readAsArrayBuffer(file);
};

export const createDateFromFormat = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);

  return new Date(year, month - 1, day);
};

export const dobRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
