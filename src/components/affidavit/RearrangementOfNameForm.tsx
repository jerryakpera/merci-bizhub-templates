import { ChangeEvent } from 'react';

import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { states } from '@/data';
import { capitalizeEveryWord } from '@/utils';
import { FormValidationError } from '../globals';
import { RearrangementOfNameFormData } from './interfaces';

type Props = {
  setSelectedFile: (selectedFile: File | null) => void;
  handleFormSubmit: (formData: RearrangementOfNameFormData) => void;
};

export const RearrangementOfNameForm = ({
  setSelectedFile,
  handleFormSubmit,
}: Props) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RearrangementOfNameFormData>({
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

  const onSubmit = (formData: RearrangementOfNameFormData) => {
    const data = {
      lga: capitalizeEveryWord(formData.lga),
      outputFileName: formData.outputFileName,
      state: capitalizeEveryWord(formData.state),
      authority: formData.authority.toUpperCase(),
      wrongNameArrangement: formData.wrongNameArrangement.toUpperCase(),
      gender: capitalizeEveryWord(formData.gender),
      correctNameArrangement: formData.correctNameArrangement.toUpperCase(),
      religion: capitalizeEveryWord(formData.religion),
      nationality: capitalizeEveryWord(formData.nationality),
      surname: formData.surname.toUpperCase(),
      firstName: formData.firstName.toUpperCase(),
      middleName: formData.middleName.toUpperCase(),
      document: formData.document,
    };

    handleFormSubmit(data);
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
            defaultValue='Affidavit'
            {...register('outputFileName', {})}
          />
        </div>
      </div>

      {/* Bio details */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Correct name arrangement */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='correctNameArrangement'
            className='text-sm text-zinc-500'
          >
            Correct name arrangement:
          </Label>
          <Input
            type='text'
            id='correctNameArrangement'
            placeholder='Correct name arrangement'
            {...register('correctNameArrangement', {
              required:
                'Enter the correct arrangement of the name of the person',
            })}
          />
          {errors.correctNameArrangement && (
            <FormValidationError error={errors.correctNameArrangement} />
          )}
        </div>

        {/* Wrong name arrangement */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='wrongNameArrangement'
            className='text-sm text-zinc-500'
          >
            Wrong name arrangement:
          </Label>
          <Input
            type='text'
            id='wrongNameArrangement'
            placeholder='Wrong name arrangement'
            {...register('wrongNameArrangement', {
              required: 'Enter the wrong arrangement of the name of the person',
            })}
          />
          {errors.wrongNameArrangement && (
            <FormValidationError error={errors.wrongNameArrangement} />
          )}
        </div>

        {/* Gender */}
        <div className='flex flex-col w-full sm:w-1/3'>
          <Label
            htmlFor='gender'
            className='text-sm text-zinc-500'
          >
            Gender:
          </Label>
          <select
            id='gender'
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('gender', {
              required: 'Select either male or female',
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
      </div>

      {/* Name details */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* First name */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='firstName'
            className='text-sm text-zinc-500'
          >
            First name:
          </Label>
          <Input
            type='text'
            id='firstName'
            placeholder='First name'
            {...register('firstName', {
              required: 'Enter the correct first name of the person',
            })}
          />
          {errors.firstName && <FormValidationError error={errors.firstName} />}
        </div>

        {/* Middle name */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='middleName'
            className='text-sm text-zinc-500'
          >
            Middle name:
          </Label>
          <Input
            type='text'
            id='middleName'
            placeholder='Middle name'
            {...register('middleName', {
              required: 'Enter the middle name of the person',
            })}
          />
          {errors.middleName && (
            <FormValidationError error={errors.middleName} />
          )}
        </div>

        {/* Surname */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='surname'
            className='text-sm text-zinc-500'
          >
            Surname:
          </Label>
          <Input
            type='text'
            id='surname'
            placeholder='Surname'
            {...register('surname', {
              required: 'Enter the surname of the person',
            })}
          />
          {errors.surname && <FormValidationError error={errors.surname} />}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Religion */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='religion'
            className='text-sm text-zinc-500'
          >
            Religion:
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

          {errors.religion && <FormValidationError error={errors.religion} />}
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
          {errors.authority && <FormValidationError error={errors.authority} />}
        </div>

        {/* Document */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='document'
            className='text-sm text-zinc-500'
          >
            Document:
          </Label>
          <Input
            type='text'
            id='document'
            placeholder='WAEC Certificate, JAMB Certificate, etc.'
            {...register('document', {
              required: 'The document with the wrong arrangement',
            })}
          />
          {errors.document && <FormValidationError error={errors.document} />}
        </div>
      </div>

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
          {errors.lga && <FormValidationError error={errors.lga} />}
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
