import { ColumnDef } from '@tanstack/react-table';

import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { NairaSign } from '@/components/global';
import { Invoice } from '@/features/invoices/invoice-types';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export const invoiceTableColumns: ColumnDef<Invoice>[] = [
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
    cell: ({ row }) => {
      const customerName = row.getValue<string>('customerName');
      return <div className='font-medium'>{customerName}</div>;
    },
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
        <div className='font-medium'>{format(createdAt, 'do MMM, h:mm b')}</div>
      );
    },
  },
  {
    accessorKey: 'totalCost',
    header: ({ column }) => {
      return (
        <div className='flex items-center gap-x-0'>
          Total Cost
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
    accessorKey: 'totalPaid',
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
      const totalPaid = parseFloat(row.getValue('totalPaid'));
      return (
        <div className='font-medium'>
          <NairaSign />
          {totalPaid}
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
      const invoice = row.original;

      return (
        <div className='flex gap-x-1 5 items-center'>
          <Link to={`/invoices/${invoice.firebaseId}`}>
            <Button size='icon'>
              <Icon
                icon='lets-icons:view-fill'
                width='24'
                height='24'
              />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
