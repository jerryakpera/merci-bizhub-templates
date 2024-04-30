import { useState } from 'react';

import { generateDocument } from '@/utils';
import { MTSelect } from '@/components/globals';
import { affidavitTypes } from '@/data/affidavits';
import {
  ChangeOfNameForm,
  GuardianshipForm,
  ChangeOfRegistrationOnSimForm,
} from '@/components/affidavit';
import {
  AffidavitFormData,
  ChangeOfNameFormData,
  GuardianshipFormData,
  ChangeOfRegistrationOnSimFormData,
} from '@/components/affidavit/interfaces';

export const Affidavit = () => {
  const [selected, setSelected] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFormSubmit<T extends AffidavitFormData>(formData: T) {
    generateDocument(selectedFile, formData.outputFileName, formData);
  }

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4 font-bold'>Generate affidavits</h1>

      <MTSelect
        selected={selected}
        options={affidavitTypes}
        setSelected={setSelected}
        label='Select affidavit type'
      />

      {selected ? (
        <div className='my-4'>
          {selected === 'Change of Name'.toLowerCase() && (
            <ChangeOfNameForm
              setSelectedFile={setSelectedFile}
              handleFormSubmit={(formData) =>
                handleFormSubmit<ChangeOfNameFormData>(formData)
              }
            />
          )}

          {selected === 'Change of Registration on Sim'.toLowerCase() && (
            <ChangeOfRegistrationOnSimForm
              setSelectedFile={setSelectedFile}
              handleFormSubmit={(formData) =>
                handleFormSubmit<ChangeOfRegistrationOnSimFormData>(formData)
              }
            />
          )}

          {selected === 'Affidavit as to Guardianship'.toLowerCase() && (
            <GuardianshipForm
              setSelectedFile={setSelectedFile}
              handleFormSubmit={(formData) =>
                handleFormSubmit<GuardianshipFormData>(formData)
              }
            />
          )}
        </div>
      ) : (
        <h3 className='text-red-600 font-semibold text-md my-4'>
          Select an affidavit type to continue
        </h3>
      )}
    </div>
  );
};
