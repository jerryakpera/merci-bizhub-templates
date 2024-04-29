import { ChangeEvent, useEffect, useState } from 'react';

import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { toWords } from '../globals';
import { AmountInNo } from '../globals/amounts';
import { FormValidationError } from '../globals';
import { DatePicker } from '../globals/DatePicker';
import { WrongTransferFormData } from './interfaces';
import { banks, states, transactionMethods } from '@/data';
import { filterNonNumbers } from '../globals/amounts/formatAmount';

type Props = {
  setSelectedFile: (selectedFile: File | null) => void;
  handleFormSubmit: (formData: WrongTransferFormData) => void;
};

export const WrongTransferForm = ({
  setSelectedFile,
  handleFormSubmit,
}: Props) => {
  const [dateOfOrder, setDateOfOrder] = useState<Date>();
  const [dateOfTransaction, setDateOfTransaction] = useState<Date>();

  const [wordAmount, setWordAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<WrongTransferFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      dateOfOrderInWords: dateOfOrder ? format(dateOfOrder, 'PPP') : '',
      dateOfTransactionInWords: dateOfTransaction
        ? format(dateOfTransaction, 'PPP')
        : '',
    },
  });

  useEffect(() => {
    if (!dateOfTransaction) return;
    setValue('dateOfTransaction', dateOfTransaction);
    setValue('dateOfTransactionInWords', format(dateOfTransaction, 'PPP'));
  }, [dateOfTransaction, setValue]);

  useEffect(() => {
    if (!dateOfOrder) return;
    setValue('dateOfOrder', dateOfOrder);
    setValue('dateOfOrderInWords', format(dateOfOrder, 'PPP'));
  }, [dateOfOrder, setValue]);

  useEffect(() => {
    const amountInDigits = filterNonNumbers(formattedAmount);
    let amountInWords = toWords.convert(Number(amountInDigits));

    amountInWords = amountInWords
      .split(' ')
      .filter((word) => word !== 'Only')
      .map((word) => {
        if (word.toLowerCase() === 'paise') return 'Kobo';
        return word;
      })
      .join(' ');

    setWordAmount(amountInWords);
    setValue('amountInWords', amountInWords);
  }, [formattedAmount, setValue]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setSelectedFile(null);
    } else {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit = (formData: WrongTransferFormData) => {
    formData.amount = formattedAmount;

    handleFormSubmit(formData);
  };

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(onSubmit)}
    >
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

        {/* Date of order in words */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='dateOfOrderInWords'
            className='text-sm text-zinc-500'
          >
            Date of order/affidavit in words:
          </Label>
          <div className='flex gap-x-1 items-center'>
            <Input
              readOnly
              type='text'
              {...register('dateOfOrderInWords', { required: true })}
            />

            <input
              type='hidden'
              {...register('dateOfOrder')}
            />

            <DatePicker
              date={dateOfOrder}
              setDate={setDateOfOrder}
            />
          </div>

          {errors.dateOfOrderInWords && (
            <FormValidationError error={errors.dateOfOrderInWords} />
          )}
        </div>
      </div>

      {/* Date and amounts */}
      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Date in Words */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='dateOfTransactionInWords'
            className='text-sm text-zinc-500'
          >
            Transaction date:
          </Label>
          <div className='flex gap-x-1 items-center'>
            <Input
              readOnly
              type='text'
              placeholder='17th April, 2024'
              {...register('dateOfTransactionInWords', { required: true })}
            />

            <input
              type='hidden'
              {...register('dateOfTransaction')}
            />

            <DatePicker
              date={dateOfTransaction}
              setDate={setDateOfTransaction}
            />
          </div>

          {errors.dateOfTransactionInWords && (
            <FormValidationError error={errors.dateOfTransactionInWords} />
          )}
        </div>

        {/* Amount */}
        <div className='w-full sm:w-1/3 flex flex-col'>
          <AmountInNo
            formattedAmount={formattedAmount}
            setFormattedAmount={setFormattedAmount}
          />
          <div className='text-xs mt-0.5 px-1 text-gray-700 font-semibold'>
            {wordAmount}
          </div>
        </div>

        {/* Transaction method */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='transactionMethod'
            className='text-sm text-zinc-500'
          >
            Transaction method:
          </Label>
          <select
            id='transactionMethod'
            defaultValue={'mobile'}
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('transactionMethod', {
              required: 'Select the method used for the transaction',
            })}
          >
            {transactionMethods.map((transactionMethod) => {
              return (
                <option
                  key={transactionMethod}
                  value={transactionMethod.toLowerCase()}
                >
                  {transactionMethod}
                </option>
              );
            })}
          </select>

          {errors.transactionMethod && (
            <FormValidationError error={errors.transactionMethod} />
          )}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Sender */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='sender'
            className='text-sm text-zinc-500'
          >
            Senders name:
          </Label>
          <Input
            type='text'
            id='sender'
            placeholder='Full name of sender'
            {...register('sender', {
              required: 'Enter the full name of the sender',
            })}
          />
          {errors.sender && <FormValidationError error={errors.sender} />}
        </div>

        {/* Sender's Bank */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='sendersBank'
            className='text-sm text-zinc-500'
          >
            Senders bank:
          </Label>
          <select
            id='sendersBank'
            defaultValue={'plateau'}
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('sendersBank', {
              required: 'The bank of the sender',
            })}
          >
            {banks.map((bank) => {
              return (
                <option
                  key={bank}
                  value={bank.toLowerCase()}
                >
                  {bank}
                </option>
              );
            })}
          </select>

          {errors.sendersBank && (
            <FormValidationError error={errors.sendersBank} />
          )}
        </div>

        {/* Sender's Account No */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='sendersAccountNo'
            className='text-sm text-zinc-500'
          >
            Sender's Account No:
          </Label>
          <Input
            type='text'
            placeholder='214522023'
            id='sendersAccountNo'
            {...register('sendersAccountNo', { required: true })}
          />

          {errors.sendersAccountNo && (
            <FormValidationError error={errors.sendersAccountNo} />
          )}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
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
        {/* Recipient */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='recipient'
            className='text-sm text-zinc-500'
          >
            Recipients name:
          </Label>
          <Input
            type='text'
            id='recipient'
            placeholder='Full name of recipient'
            {...register('recipient', {
              required: 'Enter the full name of the recipient',
            })}
          />
          {errors.recipient && <FormValidationError error={errors.recipient} />}
        </div>

        {/* Recipient's Bank */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='recipientsBank'
            className='text-sm text-zinc-500'
          >
            Recipients bank:
          </Label>
          <select
            id='recipientsBank'
            defaultValue={'plateau'}
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('recipientsBank', {
              required: 'The bank of the recipient',
            })}
          >
            {banks.map((bank) => {
              return (
                <option
                  key={bank}
                  value={bank.toLowerCase()}
                >
                  {bank}
                </option>
              );
            })}
          </select>

          {errors.recipientsBank && (
            <FormValidationError error={errors.recipientsBank} />
          )}
        </div>

        {/* Recipient's Account No */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='recipientsAccountNo'
            className='text-sm text-zinc-500'
          >
            Recipient's Account No:
          </Label>
          <Input
            type='text'
            placeholder='0013366655'
            id='recipientsAccountNo'
            {...register('recipientsAccountNo', { required: true })}
          />

          {errors.recipientsAccountNo && (
            <FormValidationError error={errors.recipientsAccountNo} />
          )}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-2 w-full'>
        {/* Intended Recipient */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='intendedRecipient'
            className='text-sm text-zinc-500'
          >
            Intended Recipients name:
          </Label>
          <Input
            type='text'
            id='intendedRecipient'
            placeholder='Full name of intendedRecipient'
            {...register('intendedRecipient', {
              required: 'Enter the full name of the intendedRecipient',
            })}
          />
          {errors.intendedRecipient && (
            <FormValidationError error={errors.intendedRecipient} />
          )}
        </div>

        {/* Intended Recipient's Bank */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='intendedRecipientsBank'
            className='text-sm text-zinc-500'
          >
            Intended Recipients bank:
          </Label>
          <select
            id='intendedRecipientsBank'
            defaultValue={'plateau'}
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
            {...register('intendedRecipientsBank', {
              required: 'The bank of the intendedRecipient',
            })}
          >
            {banks.map((bank) => {
              return (
                <option
                  key={bank}
                  value={bank.toLowerCase()}
                >
                  {bank}
                </option>
              );
            })}
          </select>

          {errors.intendedRecipientsBank && (
            <FormValidationError error={errors.intendedRecipientsBank} />
          )}
        </div>

        {/* Intended Recipient's Account No */}
        <div className='flex-1 flex flex-col'>
          <Label
            htmlFor='intendedRecipientsAccountNo'
            className='text-sm text-zinc-500'
          >
            Intended Recipient's Account No:
          </Label>
          <Input
            type='text'
            placeholder='00104452213'
            id='intendedRecipientsAccountNo'
            {...register('intendedRecipientsAccountNo', { required: true })}
          />

          {errors.intendedRecipientsAccountNo && (
            <FormValidationError error={errors.intendedRecipientsAccountNo} />
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
