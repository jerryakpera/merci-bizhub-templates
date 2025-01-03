import { format } from 'date-fns';

import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { ViewSale } from '../ViewSale';
import { EditSale } from '../forms/EditSale';
import { NairaSign } from '@/components/global';
import { Sale } from '@/features/sales/sales-types';

export const saleTableColumns: ColumnDef<Sale>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdBy',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
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
      const createdBy = row.getValue('createdBy');
      return (
        <div>
          {createdBy == 'jerryakpera@gmail.com' ? (
            <div className='bg-black text-white w-8 h-8 rounded-xl font-semibold flex text-center items-center justify-center'>
              JA
            </div>
          ) : (
            <div className='bg-blue-600 text-white w-8 h-8 rounded-xl font-semibold flex text-center items-center justify-center'>
              IA
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Date
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
      const createdAt = parseFloat(row.getValue('createdAt'));
      return (
        <div className='font-medium'>{format(createdAt, 'd MMM, yy')}</div>
      );
    },
  },

  {
    accessorKey: 'productName',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Product/Service
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
    accessorKey: 'customerName',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Customer
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
    accessorKey: 'unitCost',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Cost
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
      const unitCost = parseFloat(row.getValue('unitCost'));
      return (
        <div className='font-medium'>
          <NairaSign />
          {unitCost}
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Quantity
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
    accessorKey: 'totalCost',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Total
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
      const totalCost = parseFloat(row.getValue('totalCost'));
      return (
        <div className='font-medium'>
          <NairaSign />
          {totalCost}
        </div>
      );
    },
  },
  {
    accessorKey: 'paid',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Paid
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
      const paid = parseFloat(row.getValue('paid'));
      return (
        <div className='font-medium'>
          <NairaSign />
          {paid}
        </div>
      );
    },
  },
  {
    accessorKey: 'outstandingBalance',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Balance
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
      const outstandingBalance = parseFloat(row.getValue('outstandingBalance'));

      if (outstandingBalance == 0) {
        return (
          <div>
            <Badge className='bg-blue-600 text-white text-md w-full flex justify-center font-medium'>
              Paid
            </Badge>
          </div>
        );
      }

      if (outstandingBalance < 0) {
        return (
          <div>
            <Badge className='bg-red-700 text-white text-md w-full flex justify-center font-medium'>
              <NairaSign />
              {outstandingBalance}
            </Badge>
          </div>
        );
      }

      if (outstandingBalance > 0) {
        return (
          <div>
            <Badge className='bg-green-700 text-white text-md w-full flex justify-center font-medium'>
              <NairaSign />
              {outstandingBalance}
            </Badge>
          </div>
        );
      }
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const sale = row.original;

      return (
        <div className='flex gap-x-1 5 items-center'>
          <EditSale sale={sale} />
          <ViewSale sale={sale} />
        </div>
      );
    },
  },
];
