import { ChangeEvent, useState } from 'react';

import { toWords } from 'number-to-words';
import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { capitalizeEveryWord } from '@/utils';
import { GuardianshipFormData } from './interfaces';
import { FieldHint, FormValidationError } from '../globals';
import { relationshipsToMinor } from '@/data/relationships';
import { states } from '@/data';

type Props = {
  setSelectedFile: (selectedFile: File | null) => void;
  handleFormSubmit: (formData: GuardianshipFormData) => void;
};

export const GuardianshipForm = ({
  setSelectedFile,
  handleFormSubmit,
}: Props) => {
  const [minorsAgeInWords, setMinorsAgeInWords] = useState('Age of the minor');

  const {
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<GuardianshipFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setSelectedFile(null);
    } else {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit = (formData: GuardianshipFormData) => {
    const data = {
      minorsAge: formData.minorsAge,
      minorsAgeInWords: minorsAgeInWords,
      lga: capitalizeEveryWord(formData.lga),
      outputFileName: formData.outputFileName,
      state: capitalizeEveryWord(formData.state),
      gender: capitalizeEveryWord(formData.gender),
      minorsName: formData.minorsName.toUpperCase(),
      religion: capitalizeEveryWord(formData.religion),
      authority: capitalizeEveryWord(formData.authority),
      guardiansName: formData.guardiansName.toUpperCase(),
      nationality: capitalizeEveryWord(formData.nationality),
      minorsGender: capitalizeEveryWord(formData.minorsGender),
      relationshipToMinor: capitalizeEveryWord(formData.relationshipToMinor),
    };

    handleFormSubmit(data);
  };

  const setOutputFileName = () => {
    const { guardiansName } = getValues();
    if (!guardiansName) {
      setValue('outputFileName', 'Affidavit as to Guardianship');
    } else {
      setValue(
        'outputFileName',
        `Affidavit as to Guardianship - ${guardiansName}`
      );
    }
  };

  const handleAgeChange = () => {
    const { minorsAge } = getValues();

    if (!minorsAge) {
      setMinorsAgeInWords('Age of the minor');
      return;
    }

    const ageInWords = toWords(minorsAge);
    setMinorsAgeInWords(capitalizeEveryWord(ageInWords));
  };

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Template and file details */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Template file */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='templateFile'
            className='text-sm text-zinc-500'
          >
            Template file:
          </Label>
          <Input
            type='file'
            id='templateFile'
            onChange={handleFileChange}
            placeholder='Upload template to use'
          />

          <FieldHint hint='Select the corresponding affidavit template file' />
        </div>

        {/* Output file name */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='outputFileName'
            className='text-sm text-zinc-500'
          >
            Output file name:
          </Label>
          <Input
            type='text'
            id='outputFileName'
            {...register('outputFileName', {})}
            defaultValue='Affidavit as to Guardianship'
          />

          <FieldHint hint='File name of the output affidavit' />

          {errors.outputFileName && (
            <FormValidationError error={errors.outputFileName} />
          )}
        </div>

        {/* Authority */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='authority'
            className='text-sm text-zinc-500'
          >
            Authority/Authorities:
          </Label>
          <Input
            type='text'
            id='authority'
            placeholder='BVN or NIMC etc'
            {...register('authority', {
              required: 'The authority to inform of the change',
            })}
          />

          <FieldHint hint='Name(s) of the organization(s) to notify' />

          {errors.authority && <FormValidationError error={errors.authority} />}
        </div>
      </div>

      {/* Guardians details */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Guardians name */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='guardiansName'
            className='text-sm text-zinc-500'
          >
            Guardians name:
          </Label>
          <Input
            type='text'
            id='guardiansName'
            placeholder='Guardians name'
            onKeyDown={setOutputFileName}
            {...register('guardiansName', {
              required: 'This field is required',
            })}
          />
          <FieldHint hint='Full name of the guardian' />
          {errors.guardiansName && (
            <FormValidationError error={errors.guardiansName} />
          )}
        </div>

        {/* Guardians gender */}
        <div className='flex flex-col w-full sm:w-1/3'>
          <Label
            htmlFor='gender'
            className='text-sm text-zinc-500'
          >
            Guardians gender:
          </Label>
          <select
            id='gender'
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('gender', {
              required: 'This field is required',
            })}
          >
            {['Male', 'Female'].map((gender) => {
              return (
                <option
                  key={gender}
                  value={gender.toLowerCase()}
                >
                  {gender}
                </option>
              );
            })}
          </select>

          {errors.gender && <FormValidationError error={errors.gender} />}
        </div>

        {/* Guardians religion */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='religion'
            className='text-sm text-zinc-500'
          >
            Guardians religion:
          </Label>
          <select
            id='religion'
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('religion', {
              required: 'Select either male or female',
            })}
          >
            {['Christian', 'Muslim'].map((religion) => {
              return (
                <option
                  key={religion}
                  value={religion.toLowerCase()}
                >
                  {religion}
                </option>
              );
            })}
          </select>

          <FieldHint hint='Select the religion of the guardian' />
          {errors.religion && <FormValidationError error={errors.religion} />}
        </div>
      </div>

      {/* Location details */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Nationality */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='nationality'
            className='text-sm text-zinc-500'
          >
            Nationality:
          </Label>
          <Input
            type='text'
            id='nationality'
            defaultValue='Nigerian'
            {...register('nationality', { required: true })}
            className='border border-zinc-300 p-1 rounded-md text-sm'
          />

          <FieldHint hint='Nationality of the guardian' />

          {errors.nationality && (
            <FormValidationError error={errors.nationality} />
          )}
        </div>

        {/* State */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='state'
            className='text-sm text-zinc-500'
          >
            State:
          </Label>
          <select
            id='state'
            defaultValue={'plateau'}
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('state', {
              required: 'Select state where sender lives',
            })}
          >
            {states.map((state) => {
              return (
                <option
                  key={state}
                  value={state.toLowerCase()}
                >
                  {state}
                </option>
              );
            })}
          </select>

          <FieldHint hint='State of residence of the guardian' />

          {errors.state && <FormValidationError error={errors.state} />}
        </div>

        {/* Local Government Area (LGA) */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='lga'
            className='text-sm text-zinc-500'
          >
            LGA:
          </Label>
          <Input
            id='lga'
            type='text'
            defaultValue='Jos South'
            {...register('lga', { required: true })}
            className='border border-zinc-300 p-1 rounded-md text-sm'
          />

          <FieldHint hint='Local Government Area of residence of the guardian' />

          {errors.lga && <FormValidationError error={errors.lga} />}
        </div>
      </div>

      {/* Minors details */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Minors name */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='minorsName'
            className='text-sm text-zinc-500'
          >
            Minors name:
          </Label>
          <Input
            type='text'
            id='minorsName'
            placeholder='Minors name'
            {...register('minorsName', {
              required: 'This field is required',
            })}
          />

          <FieldHint hint='Name of the minor' />

          {errors.minorsName && (
            <FormValidationError error={errors.minorsName} />
          )}
        </div>

        {/* Minors gender */}
        <div className='flex flex-col w-full sm:w-1/3'>
          <Label
            htmlFor='minorsGender'
            className='text-sm text-zinc-500'
          >
            Minors gender:
          </Label>
          <select
            id='minorsGender'
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('minorsGender', {
              required: 'This field is required',
            })}
          >
            {['Male', 'Female'].map((gender) => {
              return (
                <option
                  key={gender}
                  value={gender.toLowerCase()}
                >
                  {gender}
                </option>
              );
            })}
          </select>

          {errors.minorsGender && (
            <FormValidationError error={errors.minorsGender} />
          )}
        </div>

        {/* Minors age */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='minorsAge'
            className='text-sm text-zinc-500'
          >
            Minors age:
          </Label>
          <Input
            type='number'
            id='minorsAge'
            placeholder='Minors age'
            onKeyUp={handleAgeChange}
            {...register('minorsAge', {
              required: 'This field is required',
            })}
          />

          <FieldHint hint={minorsAgeInWords} />

          {errors.minorsAge && <FormValidationError error={errors.minorsAge} />}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Relationship to minor */}
        <div className='flex flex-col w-full'>
          <Label
            htmlFor='relationshipToMinor'
            className='text-sm text-zinc-500'
          >
            Relationship to minor:
          </Label>
          <select
            id='relationshipToMinor'
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('relationshipToMinor', {
              required: 'This field is required',
            })}
          >
            {relationshipsToMinor.map((relationship) => {
              return (
                <option
                  key={relationship}
                  value={relationship.toLowerCase()}
                >
                  {relationship}
                </option>
              );
            })}
          </select>

          <FieldHint hint='The guardians relationship to the minor' />

          {errors.relationshipToMinor && (
            <FormValidationError error={errors.relationshipToMinor} />
          )}
        </div>
      </div>

      <div className='flex gap-x-2'>
        <Button
          size='lg'
          type='button'
          className='flex-1'
          variant='destructive'
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button
          size='lg'
          type='submit'
          className='flex-1'
        >
          Generate
        </Button>
      </div>
    </form>
  );
};
