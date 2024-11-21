import { ChangeEvent, useState } from 'react';

import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { states } from '@/data';
import { FormValidationError } from '../globals';
import { RemovalOfNameFormData } from './interfaces';
import { capitalizeEveryWord, dobRegex } from '@/utils';

type Props = {
  setSelectedFile: (selectedFile: File | null) => void;
  handleFormSubmit: (formData: RemovalOfNameFormData) => void;
};

export const RemovalOfName = ({ setSelectedFile, handleFormSubmit }: Props) => {
  const {
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RemovalOfNameFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [removeName, setRemoveName] = useState<string>('');
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setSelectedFile(null);
    } else {
      setSelectedFile(event.target.files[0]);
    }
  };

  const setOutputFileName = () => {
    const { fullName } = getValues();
    if (!fullName) {
      setValue('outputFileName', 'Removal Of Name');
    } else {
      setValue('outputFileName', `Removal Of Name - ${fullName}`);
    }
  };

  const setCorrectNames = () => {
    const { nameToRemove, firstName, otherName, surname } = getValues();

    if (nameToRemove.toLowerCase() === firstName.toLowerCase()) {
      setRemoveName(`first name: ${firstName}`);
    }

    if (nameToRemove.toLowerCase() === otherName.toLowerCase()) {
      setRemoveName(`other name: ${otherName}`);
    }

    if (nameToRemove.toLowerCase() === surname.toLowerCase()) {
      setRemoveName(`surname: ${surname}`);
    }
  };

  const onSubmit = (formData: RemovalOfNameFormData) => {
    const data = {
      fullName: formData.fullName.toUpperCase(),
      gender: capitalizeEveryWord(formData.gender),
      religion: capitalizeEveryWord(formData.religion),
      nationality: capitalizeEveryWord(formData.nationality),
      lga: capitalizeEveryWord(formData.lga),
      state: capitalizeEveryWord(formData.state),

      authority: formData.authority.toUpperCase(),

      surname: formData.surname.toUpperCase(),
      firstName: formData.firstName.toUpperCase(),
      otherName: formData.otherName.toUpperCase(),

      correctName: formData.correctName.toUpperCase(),
      nameToRemove: removeName.toUpperCase(),

      outputFileName: formData.outputFileName,
    };

    handleFormSubmit(data);
  };

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Template and file details */}
      <div className='grid grid-cols-3 w-full gap-3'>
        {/* Template file */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='outputFileName'
            className='text-sm text-zinc-500'
          >
            Output file name:
          </Label>
          <Input
            type='text'
            id='outputFileName'
            defaultValue='Removal of name'
            {...register('outputFileName', {})}
          />
        </div>

        {/* Authority */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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
      </div>

      {/* Bio details */}
      <div className='grid grid-cols-3 w-full gap-3'>
        {/* Full name */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='fullName'
            className='text-sm text-zinc-500'
          >
            Full name:
          </Label>
          <Input
            type='text'
            id='fullName'
            placeholder='Full name'
            {...register('fullName', {
              required: 'Enter the full name of the person',
              onChange: setOutputFileName,
            })}
          />
          {errors.fullName && <FormValidationError error={errors.fullName} />}
        </div>

        {/* Gender */}
        <div className='col-span-3 sm:col-span-1 flex flex-col'>
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

        {/* Religion */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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
      </div>

      {/* Location details */}
      <div className='grid grid-cols-3 w-full gap-3'>
        {/* Nationality */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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

      {/* Name details */}
      <div className='grid grid-cols-3 w-full gap-3'>
        {/* First name */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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
              required: 'Enter the first name of the person',
            })}
          />
          {errors.firstName && <FormValidationError error={errors.firstName} />}
        </div>

        {/* Other name */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='otherName'
            className='text-sm text-zinc-500'
          >
            Other name:
          </Label>
          <Input
            type='text'
            id='otherName'
            placeholder='Other name'
            {...register('otherName', {
              required: 'Enter the other name of the person',
            })}
          />
          {errors.otherName && <FormValidationError error={errors.otherName} />}
        </div>

        {/* Surname */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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

      {/* Correct name */}
      <div className='grid grid-cols-3 w-full gap-3'>
        {/* Name to remove */}
        <div className='col-span-1 flex flex-col'>
          <Label
            htmlFor='nameToRemove'
            className='text-sm text-zinc-500'
          >
            Name to remove:
          </Label>
          <Input
            type='text'
            id='nameToRemove'
            placeholder='Name to remove'
            {...register('nameToRemove', {
              required: 'Enter the name you would like to remove',
              onChange: setCorrectNames,
            })}
          />
          {errors.nameToRemove && (
            <FormValidationError error={errors.nameToRemove} />
          )}
        </div>

        {/* Correct name */}
        <div className='col-span-1 md:col-span-2 flex flex-col'>
          <Label
            htmlFor='correctName'
            className='text-sm text-zinc-500'
          >
            Correct name:
          </Label>
          <Input
            type='text'
            id='correctName'
            placeholder='Correct name'
            {...register('correctName', {
              required: 'Enter the correct full name',
            })}
          />
          {errors.correctName && (
            <FormValidationError error={errors.correctName} />
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
