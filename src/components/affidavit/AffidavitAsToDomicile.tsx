import { ChangeEvent } from 'react';

import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { capitalizeEveryWord } from '@/utils';
import { FieldHint, FormValidationError } from '../globals';
import { AffidavitAsToDomicileFormData } from './interfaces';
import { states, religions, relationshipsToSpouse } from '@/data';

type Props = {
  setSelectedFile: (selectedFile: File | null) => void;
  handleFormSubmit: (formData: AffidavitAsToDomicileFormData) => void;
};

export const AffidavitAsToDomicile = ({
  setSelectedFile,
  handleFormSubmit,
}: Props) => {
  const {
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<AffidavitAsToDomicileFormData>({
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

  const onSubmit = (formData: AffidavitAsToDomicileFormData) => {
    const data = {
      fullName: formData.fullName.toUpperCase(),
      gender: capitalizeEveryWord(formData.gender),
      religion: capitalizeEveryWord(formData.religion),
      nationality: capitalizeEveryWord(formData.nationality),
      lga: capitalizeEveryWord(formData.lga),
      state: capitalizeEveryWord(formData.state),
      relationshipToSpouse: capitalizeEveryWord(formData.relationshipToSpouse),
      spouseName: formData.spouseName.toUpperCase(),
      domicile: capitalizeEveryWord(formData.domicile),
      outputFileName: formData.outputFileName,
    };

    handleFormSubmit(data);
  };

  const setOutputFileName = () => {
    const { fullName } = getValues();
    if (!fullName) {
      setValue('outputFileName', 'Affidavit as to Domicile');
    } else {
      setValue('outputFileName', `Affidavit as to Domicile - ${fullName}`);
    }
  };

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Template and file details */}
      <div className='grid grid-cols-3 sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Template file */}
        <div className='col-span-1 flex flex-col'>
          <Label
            htmlFor='templateFile'
            className='text-sm text-zinc-500'
          >
            Template file:
          </Label>
          <Input
            type='file'
            id='templateFile'
            onBlur={handleFileChange}
            placeholder='Upload template to use'
          />

          <FieldHint hint='Select the corresponding affidavit template file' />
        </div>

        {/* Output file name */}
        <div className='col-span-2 flex flex-col'>
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
            defaultValue='Affidavit as to Domicile'
          />

          <FieldHint hint='File name of the output affidavit' />

          {errors.outputFileName && (
            <FormValidationError error={errors.outputFileName} />
          )}
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

          <FieldHint hint='Enter a nationality' />

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
              required: 'Select state where affidavit owner lives',
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

          <FieldHint hint='State of residence of the affidavit owner' />

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

          <FieldHint hint='Local Government Area of residence of the affidavit owner' />

          {errors.lga && <FormValidationError error={errors.lga} />}
        </div>
      </div>

      {/* Details */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Full name */}
        <div className='flex-1 flex flex-col'>
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
              required: 'This field is required',
            })}
          />
          <FieldHint hint='Full name of the affidavit owner' />
          {errors.fullName && <FormValidationError error={errors.fullName} />}
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
              required: 'Select a religion',
            })}
          >
            {religions.map((religion) => {
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

          <FieldHint hint='Select the religion' />
          {errors.religion && <FormValidationError error={errors.religion} />}
        </div>
      </div>

      {/* Spouse Details */}
      <div className='grid grid-cols-3 sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Spouse name */}
        <div className='col-span-1 flex flex-col'>
          <Label
            htmlFor='spouseName'
            className='text-sm text-zinc-500'
          >
            Spouse's name:
          </Label>
          <Input
            type='text'
            id='spouseName'
            placeholder='Spouse name'
            {...register('spouseName', {
              required: 'This field is required',
            })}
          />

          <FieldHint hint='Name of the spouse of the affidavit owner' />

          {errors.spouseName && (
            <FormValidationError error={errors.spouseName} />
          )}
        </div>

        {/* Relationship to spouse */}
        <div className='col-span-2 flex flex-col w-full'>
          <Label
            htmlFor='relationshipToSpouse'
            className='text-sm text-zinc-500'
          >
            Relationship to spouse:
          </Label>
          <select
            id='relationshipToSpouse'
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('relationshipToSpouse', {
              required: 'This field is required',
            })}
          >
            {relationshipsToSpouse.map((relationship) => {
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

          <FieldHint hint='The affidavits owner relationship to the spouse' />

          {errors.relationshipToSpouse && (
            <FormValidationError error={errors.relationshipToSpouse} />
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
