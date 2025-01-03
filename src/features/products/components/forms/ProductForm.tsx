import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { FormLabel } from '@/components/globals/FormLabel';

import { FieldHint } from '@/components/globals';
import { FormValidationError } from '@/components/global';

import {
  Product,
  productCategoryOptions,
} from '@/features/products/products-types';

type Props = {
  product?: Product;
  handleFormSubmit: (formData: Partial<Product>) => void;
};

export const ProductForm = ({ product, handleFormSubmit }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Product>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  if (product && product.id) {
    const { productName, price, genPrice, category } = product;

    setValue('price', price);
    setValue('category', category);
    setValue('genPrice', genPrice);
    setValue('productName', productName);
  }

  const onSubmit = (formData: Partial<Product>) => {
    const { productName, price, genPrice, category } = formData;

    const data = {
      category: category,
      price: Number(price),
      genPrice: Number(genPrice),
      productName: productName?.trim(),
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
          htmlForText='productName'
          label='Product name'
        />
        {errors.productName && (
          <FormValidationError fieldError={errors.productName} />
        )}
        <Input
          type='text'
          {...register('productName', {
            required: 'The product name cannot be blank',
          })}
          id='productName'
          placeholder='Photocopy'
        />
        <FieldHint hint='The name of the product/service eg (printing or photocopy)' />
      </div>

      <div>
        <FormLabel
          htmlForText='category'
          label='Category'
        />
        {errors.category && (
          <FormValidationError fieldError={errors.category} />
        )}
        <select
          defaultValue='Product'
          {...register('category')}
          className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs w-full'
        >
          {productCategoryOptions.map((pc) => {
            return (
              <option
                key={pc}
                value={pc}
              >
                {pc}
              </option>
            );
          })}
        </select>
        <FieldHint hint='The category eg (product or service)' />
      </div>

      <div>
        <FormLabel
          label='Price'
          htmlForText='price'
        />
        {errors.price && <FormValidationError fieldError={errors.price} />}
        <Input
          id='price'
          type='number'
          placeholder='50'
          {...register('price', {
            required: 'The price cannot be blank',
            min: {
              value: 10,
              message: 'The price must be higher than 10',
            },
            max: {
              value: 100000,
              message: 'The price must be lower than 100,000',
            },
          })}
        />
        <FieldHint hint='The price of a single unit for the service/product' />
      </div>

      <div>
        <FormLabel
          label='Price with gen'
          htmlForText='genPrice'
        />
        {errors.genPrice && (
          <FormValidationError fieldError={errors.genPrice} />
        )}
        <Input
          id='genPrice'
          type='number'
          placeholder='50'
          {...register('genPrice', {
            required: 'The gen price cannot be blank',
            min: {
              value: 10,
              message: 'The gen price must be higher than 10',
            },
            max: {
              value: 100000,
              message: 'The gen price must be lower than 100,000',
            },
          })}
        />
        <FieldHint hint='The price of a single unit for the service/product when on gen' />
      </div>

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
