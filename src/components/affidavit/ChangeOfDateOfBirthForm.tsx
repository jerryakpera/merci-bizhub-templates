import { ChangeEvent, useState } from 'react';

import { formatDate } from 'date-fns';
import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { states } from '@/data';
import { capitalizeEveryWord, createDateFromFormat, dobRegex } from '@/utils';
import { FormValidationError } from '../globals';
import { ChangeOfDateOfBirthFormData } from './interfaces';

type Props = {
  setSelectedFile: (selectedFile: File | null) => void;
  handleFormSubmit: (formData: ChangeOfDateOfBirthFormData) => void;
};

export const ChangeOfDateOfBirthForm = ({
  setSelectedFile,
  handleFormSubmit,
}: Props) => {
  const [wrongDobInWords, setWrongDobInWords] = useState<string>();
  const [correctDobInWords, setCorrectDobInWords] = useState<string>();

  const {
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeOfDateOfBirthFormData>({
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

  const handleWrongDobChange = () => {
    const wrongDob = getValues('wrongDob');

    if (errors.wrongDob || !dobRegex.test(wrongDob)) return;

    const wrongDobDate = createDateFromFormat(wrongDob);
    const formatedWrongDob = formatDate(wrongDobDate, 'do MMMM, yyyy');

    setWrongDobInWords(formatedWrongDob);
    setValue('wrongDobInWords', formatedWrongDob);
  };

  const handleCorrectDobChange = () => {
    const correctDob = getValues('correctDob');

    if (errors.correctDob || !dobRegex.test(correctDob)) return;

    const correctDobDate = createDateFromFormat(correctDob);
    const formatedCorrectDob = formatDate(correctDobDate, 'do MMMM, yyyy');

    setCorrectDobInWords(formatedCorrectDob);
    setValue('correctDobInWords', formatedCorrectDob);
  };

  const onSubmit = (formData: ChangeOfDateOfBirthFormData) => {
    const data = {
      wrongDob: formData.wrongDob,
      correctDob: formData.correctDob,
      name: formData.name.toUpperCase(),
      lga: capitalizeEveryWord(formData.lga),
      outputFileName: formData.outputFileName,
      state: capitalizeEveryWord(formData.state),
      authority: formData.authority.toUpperCase(),
      gender: capitalizeEveryWord(formData.gender),
      religion: capitalizeEveryWord(formData.religion),
      nationality: capitalizeEveryWord(formData.nationality),
      wrongDobInWords: capitalizeEveryWord(formData.wrongDobInWords),
      correctDobInWords: capitalizeEveryWord(formData.correctDobInWords),
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

      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Wrong date of birth */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='wrongDob'
            className='text-sm text-zinc-500'
          >
            Wrong date of birth: {!errors.wrongDob ? wrongDobInWords : ''}
          </Label>
          <div className='flex gap-x-1 items-center'>
            <Input
              type='text'
              placeholder='dd/mm/yyyy'
              onKeyUp={handleWrongDobChange}
              {...register('wrongDob', {
                required: true,
                pattern: {
                  value: /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/,
                  message: 'Enter a valid date (eg. 18/02/1998)',
                },
              })}
            />
          </div>

          {errors.wrongDob && <FormValidationError error={errors.wrongDob} />}
        </div>

        {/* Correct date of birth */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='correctDob'
            className='text-sm text-zinc-500'
          >
            Correct date of birth: {!errors.correctDob ? correctDobInWords : ''}
          </Label>
          <div className='flex gap-x-1 items-center'>
            <Input
              type='text'
              placeholder='dd/mm/yyyy'
              onKeyUp={handleCorrectDobChange}
              {...register('correctDob', {
                required: true,
                pattern: {
                  value: dobRegex,
                  message: 'Enter a valid date (eg. 18/02/1998)',
                },
              })}
            />
          </div>

          {errors.correctDob && (
            <FormValidationError error={errors.correctDob} />
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