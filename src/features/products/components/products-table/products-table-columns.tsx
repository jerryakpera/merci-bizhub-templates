import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Product } from '../../products-types';
import { NairaSign } from '@/components/global';
import { EditProduct } from '../forms/EditProduct';
import { ViewProduct } from '../ViewProduct';

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'productName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      return (
        <div className='text-center font-medium'>
          <NairaSign />
          {price}
        </div>
      );
    },
  },
  {
    accessorKey: 'genPrice',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price with gen
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('genPrice'));
      return (
        <div className='text-center font-medium'>
          <NairaSign />
          {price}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className='flex gap-x-1 5 items-center'>
          <EditProduct product={product} />
          <ViewProduct product={product} />
        </div>
      );
    },
  },
];
