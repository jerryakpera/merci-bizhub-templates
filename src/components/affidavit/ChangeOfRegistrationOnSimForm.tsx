import { ChangeEvent } from 'react';

import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { states } from '@/data';
import { capitalizeEveryWord } from '@/utils';
import { FormValidationError } from '../globals';
import { ChangeOfRegistrationOnSimData } from './interfaces';
import { networks } from '@/data/networks';

type Props = {
  setSelectedFile: (selectedFile: File | null) => void;
  handleFormSubmit: (formData: ChangeOfRegistrationOnSimData) => void;
};

export const ChangeOfRegistrationOnSimForm = ({
  setSelectedFile,
  handleFormSubmit,
}: Props) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeOfRegistrationOnSimData>({
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

  const onSubmit = (formData: ChangeOfRegistrationOnSimData) => {
    const data = {
      phone: formData.phone,
      name: formData.name.toUpperCase(),
      lga: capitalizeEveryWord(formData.lga),
      outputFileName: formData.outputFileName,
      state: capitalizeEveryWord(formData.state),
      gender: capitalizeEveryWord(formData.gender),
      simNetwork: formData.simNetwork.toUpperCase(),
      previousName: formData.previousName.toUpperCase(),
      religion: capitalizeEveryWord(formData.religion),
      nationality: capitalizeEveryWord(formData.nationality),
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
        {/* Name */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='name'
            className='text-sm text-zinc-500'
          >
            Name:
          </Label>
          <Input
            type='text'
            id='name'
            placeholder='Name'
            {...register('name', {
              required: 'Enter the correct name of the person',
            })}
          />
          {errors.name && <FormValidationError error={errors.name} />}
        </div>

        {/* Previous name */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='wrongName'
            className='text-sm text-zinc-500'
          >
            Previous name:
          </Label>
          <Input
            type='text'
            id='previousName'
            placeholder='Previous name'
            {...register('previousName', {
              required: 'Enter the wrong name of the person',
            })}
          />
          {errors.previousName && (
            <FormValidationError error={errors.previousName} />
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

      {/* Phone details */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Phone */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='phone'
            className='text-sm text-zinc-500'
          >
            Phone No:
          </Label>
          <Input
            type='text'
            id='phone'
            placeholder='09044522012'
            {...register('phone', {
              required: 'The phone of the sim card',
            })}
          />
          {errors.phone && <FormValidationError error={errors.phone} />}
        </div>

        {/* Sim network */}
        <div className='flex flex-col w-full sm:w-1/3'>
          <Label
            htmlFor='simNetwork'
            className='text-sm text-zinc-500'
          >
            Sim network:
          </Label>
          <select
            id='simNetwork'
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('simNetwork', {
              required: 'Select the network of the phone',
            })}
          >
            {networks.map((simNetwork) => {
              return (
                <option
                  key={simNetwork}
                  value={simNetwork.toLowerCase()}
                >
                  {simNetwork}
                </option>
              );
            })}
          </select>

          {errors.gender && <FormValidationError error={errors.gender} />}
        </div>
      </div>

      {/* Religion */}
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
