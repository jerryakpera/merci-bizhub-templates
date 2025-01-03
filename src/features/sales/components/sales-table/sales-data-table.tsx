import { useState } from 'react';

import {
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { AddSale } from '../AddSale';
import { SalesBreakdown } from '../SalesBreakdown';
import { Sale } from '../../sales-types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/stores';
import { deleteSalesByIds } from '../../sales-thunk';
import { useToast } from '@/hooks/use-toast';

interface DataTableProps<TData, TValue> {
  data: TData[];
  refetchSales: () => void;
  columns: ColumnDef<TData, TValue>[];
}

export function SalesDataTable<TData, TValue>({
  data,
  columns,
  refetchSales,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  });

  const handleDeleteSelectedSales = (selectedSales: Sale[]) => {
    const salesIdsToDelete = selectedSales.map((sale) => sale.id);

    if (
      confirm(
        'Are you sure you want to delete these items? This action cannot be undone!'
      )
    ) {
      dispatch(deleteSalesByIds(salesIdsToDelete))
        .unwrap()
        .then(() => {
          toast({
            title: 'Sales deleted successfully.',
            description: `Deleted ${selectedSales.length}(s) items.)`,
          });

          refetchSales();
        })
        .catch(() => {
          toast({
            title: 'Error deleting sales.',
            description: `Could not delete ${selectedSales.length}(s) items.)`,
          });
        });
    }
  };

  return (
    <div>
      <div className='flex items-center py-4 justify-between'>
        <div className='flex items-center gap-x-2'>
          <Input
            placeholder='Filter customer...'
            value={
              (table.getColumn('customerName')?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn('customerName')
                ?.setFilterValue(event.target.value)
            }
          />
          <Input
            placeholder='Filter product/service...'
            value={
              (table.getColumn('productName')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('productName')?.setFilterValue(event.target.value)
            }
          />
        </div>

        <AddSale />
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            size='sm'
            onClick={() =>
              handleDeleteSelectedSales(
                table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original as Sale)
              )
            }
            disabled={table.getFilteredSelectedRowModel().rows.length == 0}
          >
            Delete
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <SalesBreakdown
          sales={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original as Sale)}
        />
      )}
    </div>
  );
}
