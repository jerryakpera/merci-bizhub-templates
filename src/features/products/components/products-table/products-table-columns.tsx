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
        <div className='flex items-center gap-x-0'>
          Product name
          <Button
            size='icon'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Category
          <Button
            size='icon'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Price
          <Button
            size='icon'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      return (
        <div className='font-medium'>
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
        <div className='flex items-center gap-x-0'>
          Price with gen
          <Button
            size='icon'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('genPrice'));
      return (
        <div className='font-medium'>
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
