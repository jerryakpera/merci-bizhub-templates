import { ChangeEvent, useState } from 'react';

import { formatDate } from 'date-fns';
import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { states } from '@/data';
import { capitalizeEveryWord, dobRegex, createDateFromFormat } from '@/utils';
import { FormValidationError } from '../globals';
import { CorrectionOfNameAndDateOfBirthFormData } from './interfaces';

type Props = {
  setSelectedFile: (selectedFile: File | null) => void;
  handleFormSubmit: (formData: CorrectionOfNameAndDateOfBirthFormData) => void;
};

export const CorrectionOfNameAndDob = ({
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
  } = useForm<CorrectionOfNameAndDateOfBirthFormData>({
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

  const setOutputFileName = () => {
    const { fullName } = getValues();
    if (!fullName) {
      setValue('outputFileName', 'Correction of Name and DOB');
    } else {
      setValue('outputFileName', `Correction of Name and DOB - ${fullName}`);
    }
  };

  const onSubmit = (formData: CorrectionOfNameAndDateOfBirthFormData) => {
    const data = {
      fullName: formData.fullName.toUpperCase(),
      gender: capitalizeEveryWord(formData.gender),
      religion: capitalizeEveryWord(formData.religion),
      nationality: capitalizeEveryWord(formData.nationality),
      lga: capitalizeEveryWord(formData.lga),
      state: capitalizeEveryWord(formData.state),

      authority: formData.authority.toUpperCase(),

      wrongSurname: formData.wrongSurname.toUpperCase(),
      wrongFirstName: formData.wrongFirstName.toUpperCase(),
      wrongOtherName: formData.wrongOtherName.toUpperCase(),

      correctSurname: formData.correctSurname.toUpperCase(),
      correctFirstName: formData.correctFirstName.toUpperCase(),
      correctOtherName: formData.correctOtherName.toUpperCase(),

      wrongDob: formData.wrongDob,
      correctDob: formData.correctDob,
      wrongDobInWords: capitalizeEveryWord(formData.wrongDobInWords),
      correctDobInWords: capitalizeEveryWord(formData.correctDobInWords),

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
            defaultValue='Correction of Name and DOB'
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
            onKeyDown={setOutputFileName}
            {...register('fullName', {
              required: 'Enter the full name of the person',
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

      {/* Wrong name details */}
      <div className='grid grid-cols-3 w-full gap-3'>
        {/* Wrong first name */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='wrongFirstName'
            className='text-sm text-zinc-500'
          >
            Wrong first name:
          </Label>
          <Input
            type='text'
            id='wrongFirstName'
            placeholder='Wrong first name'
            {...register('wrongFirstName', {
              required: 'Enter the wrong first name of the person',
            })}
          />
          {errors.wrongFirstName && (
            <FormValidationError error={errors.wrongFirstName} />
          )}
        </div>

        {/* Wrong other name */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='wrongOtherName'
            className='text-sm text-zinc-500'
          >
            Wrong other name:
          </Label>
          <Input
            type='text'
            id='wrongOtherName'
            placeholder='Wrong other name'
            {...register('wrongOtherName', {
              required: 'Enter the wrong other name of the person',
            })}
          />
          {errors.wrongOtherName && (
            <FormValidationError error={errors.wrongOtherName} />
          )}
        </div>

        {/* Wrong surname */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='wrongSurname'
            className='text-sm text-zinc-500'
          >
            Wrong surname:
          </Label>
          <Input
            type='text'
            id='wrongSurname'
            placeholder='Wrong surname'
            {...register('wrongSurname', {
              required: 'Enter the wrong other name of the person',
            })}
          />
          {errors.wrongSurname && (
            <FormValidationError error={errors.wrongSurname} />
          )}
        </div>
      </div>

      {/* Correct name details */}
      <div className='grid grid-cols-3 w-full gap-3'>
        {/* Correct first name */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='correctFirstName'
            className='text-sm text-zinc-500'
          >
            Correct first name:
          </Label>
          <Input
            type='text'
            id='correctFirstName'
            placeholder='Correct first name'
            {...register('correctFirstName', {
              required: 'Enter the correct first name of the person',
            })}
          />
          {errors.correctFirstName && (
            <FormValidationError error={errors.correctFirstName} />
          )}
        </div>

        {/* Correct other name */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='correctOtherName'
            className='text-sm text-zinc-500'
          >
            Correct other name:
          </Label>
          <Input
            type='text'
            id='correctOtherName'
            placeholder='Correct other name'
            {...register('correctOtherName', {
              required: 'Enter the correct other name of the person',
            })}
          />
          {errors.correctOtherName && (
            <FormValidationError error={errors.correctOtherName} />
          )}
        </div>

        {/* Correct surname */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
          <Label
            htmlFor='correctSurname'
            className='text-sm text-zinc-500'
          >
            Correct surname:
          </Label>
          <Input
            type='text'
            id='correctSurname'
            placeholder='Correct surname'
            {...register('correctSurname', {
              required: 'Enter the correct other name of the person',
            })}
          />
          {errors.correctSurname && (
            <FormValidationError error={errors.correctSurname} />
          )}
        </div>
      </div>

      {/* DOB details */}
      <div className='grid grid-cols-3 w-full gap-3'>
        {/* Wrong date of birth */}
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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
        <div className='col-span-3 md:col-span-1 flex flex-col'>
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
