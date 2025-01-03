import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { AppDispatch } from '@/app/stores';

import { FieldHint } from '@/components/globals';
import { FormValidationError } from '@/components/global';
import { FormLabel } from '@/components/globals/FormLabel';

import { Product } from '@/features/products/products-types';
import { Sale, paymentMethodOptions } from '../../sales-types';

import { fetchProducts } from '@/features/products/products-thunk';
import { selectProducts } from '@/features/products/products-slice';

type Props = {
  sale?: Sale;
  handleFormSubmit: (formData: Partial<Sale>) => void;
};

export const SaleForm = ({ sale, handleFormSubmit }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);
  const [filter, setFilter] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Sale>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const paid = watch('paid');
  const unitCost = watch('unitCost');
  const quantity = watch('quantity');
  const totalCost = watch('totalCost');
  const paymentStatus = watch('paymentStatus');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filterProducts = (val: string) => {
      const pin = val.toLowerCase();

      return products.filter((product) => {
        const straw = product.productName.toLowerCase();
        return straw.includes(pin);
      });
    };

    setFilteredProducts(filterProducts(filter));
  }, [filter, products]);

  useEffect(() => {
    const calculateTotalCost = () => {
      const quantity = Number(watch('quantity') || 0);
      const unitCost = Number(watch('unitCost') || 0);
      return quantity * unitCost;
    };

    const totalCost = calculateTotalCost();
    setValue('totalCost', totalCost);
  }, [quantity, unitCost, setValue, watch]);

  useEffect(() => {
    const calculateOutstandingBalance = () => {
      const total = Number(watch('totalCost') || 0);
      const paidAmount = Number(watch('paid') || 0);
      return total - paidAmount;
    };

    const outstandingBalance = calculateOutstandingBalance();
    setValue('outstandingBalance', outstandingBalance);

    if (outstandingBalance === 0) {
      setValue('paymentStatus', 'Paid');
    } else {
      setValue('paymentStatus', 'Pending');
    }
  }, [totalCost, paid, setValue, watch]);

  useEffect(() => {
    if (sale && sale.id && products.length > 0) {
      setValue('paid', sale.paid);
      setValue('quantity', sale.quantity);
      setValue('unitCost', sale.unitCost);
      setValue('totalCost', sale.totalCost);
      setValue('productName', sale.productName);
      setValue('customerName', sale.customerName);
      setValue('paymentMethod', sale.paymentMethod);
      setValue('paymentStatus', sale.paymentStatus);
      setValue('outstandingBalance', sale.outstandingBalance);
    }
  }, [sale, setValue, products]);

  const onSubmit = (formData: Partial<Sale>) => {
    const data = {
      paid: Number(formData.paid),
      quantity: Number(formData.quantity),
      unitCost: Number(formData.unitCost),
      paymentMethod: formData.paymentMethod,
      totalCost: Number(formData.totalCost),
      paymentStatus: formData.paymentStatus,
      productName: formData.productName?.trim(),
      customerName: formData.customerName?.trim() || '',
      outstandingBalance: Number(formData.outstandingBalance),
    };

    handleFormSubmit(data);
  };

  return (
    <form
      className='space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <FormLabel
          label='Product/Service name'
          htmlForText='productName'
        />
        {errors.productName && (
          <FormValidationError fieldError={errors.productName} />
        )}
        <div className='space-y-1'>
          <Input
            value={filter}
            placeholder='Filter products'
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            {...register('productName')}
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs w-full'
            onChange={(e) => {
              const selectedProductName = e.target.value;
              const selectedProduct = products.find(
                (product) => product.productName === selectedProductName
              );

              if (selectedProduct) {
                setValue('unitCost', selectedProduct.price);
              }
            }}
          >
            <option value=''>Select a product</option>
            {filteredProducts.map((product) => {
              return (
                <option
                  key={product.id}
                  value={product.productName}
                >
                  {product.productName}
                </option>
              );
            })}
          </select>
        </div>

        <FieldHint hint='The name of the sale/service eg being sold' />
      </div>

      <div className='grid grid-cols-3 gap-x-2'>
        <div>
          <FormLabel
            label='Unit cost (N)'
            htmlForText='unitCost'
          />
          {errors.unitCost && (
            <FormValidationError fieldError={errors.unitCost} />
          )}
          <Input
            id='unitCost'
            type='number'
            {...register('unitCost', {
              required: 'The unit cost cannot be blank',
              min: {
                value: 10,
                message: 'The unit cost must be higher than 10',
              },
              max: {
                value: 100000,
                message: 'The unit cost must be lower than 100,000',
              },
            })}
          />
        </div>
        <div>
          <FormLabel
            label='Quantity (N)'
            htmlForText='quantity'
          />
          {errors.quantity && (
            <FormValidationError fieldError={errors.quantity} />
          )}
          <Input
            id='quantity'
            type='number'
            defaultValue={1}
            {...register('quantity', {
              required: 'The quantity cannot be blank',
              min: {
                value: 1,
                message: 'The quantity cannot be lower than 1.',
              },
            })}
          />
        </div>
        <div>
          <FormLabel
            label='Total (N)'
            htmlForText='totalCost'
          />
          {errors.totalCost && (
            <FormValidationError fieldError={errors.totalCost} />
          )}
          <Input
            id='totalCost'
            type='number'
            readOnly
            defaultValue={1}
            {...register('totalCost', {
              required: 'The total cost cannot be blank',
            })}
          />
        </div>
      </div>

      <div>
        <FormLabel
          label='Paid (N)'
          htmlForText='paid'
        />
        {errors.paid && <FormValidationError fieldError={errors.paid} />}
        <Input
          id='paid'
          type='number'
          {...register('paid', {
            required: 'The amount paid by the customer',
          })}
        />
      </div>

      <div className='grid grid-cols-3 gap-x-2'>
        <div>
          <FormLabel
            label='Payment method'
            htmlForText='paymentMethod'
          />
          {errors.paymentMethod && (
            <FormValidationError fieldError={errors.paymentMethod} />
          )}

          <select
            defaultValue='Cash'
            {...register('paymentMethod')}
            className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs w-full'
          >
            {paymentMethodOptions.map((pm) => {
              return (
                <option
                  key={pm}
                  value={pm}
                >
                  {pm}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <FormLabel
            label='Payment status'
            htmlForText='paymentStatus'
          />
          {errors.paymentStatus && (
            <FormValidationError fieldError={errors.paymentStatus} />
          )}
          <Input
            readOnly
            type='text'
            id='paymentStatus'
            {...register('paymentStatus', {})}
          />
        </div>
        <div>
          <FormLabel
            label='Outstanding (N)'
            htmlForText='outstandingBalance'
          />
          {errors.outstandingBalance && (
            <FormValidationError fieldError={errors.outstandingBalance} />
          )}
          <Input
            readOnly
            type='number'
            id='outstandingBalance'
            {...register('outstandingBalance', {})}
          />
        </div>
      </div>

      {paymentStatus !== 'Paid' && (
        <div>
          <FormLabel
            label='Customer name'
            htmlForText='customerName'
          />
          {errors.customerName && (
            <FormValidationError fieldError={errors.customerName} />
          )}
          <Input
            type='text'
            placeholder='John Doe'
            id='customerName'
            {...register('customerName', {
              required: 'The customer name is required for pending sales',
            })}
          />
        </div>
      )}

      <div className='flex justify-end items-center gap-x-2'>
        <Button className='bg-red-700 hover:bg-red-800 duration-75'>
          Cancel
        </Button>
        <Button
          type='submit'
          className='bg-green-700 hover:bg-green-800 duration-75'
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
