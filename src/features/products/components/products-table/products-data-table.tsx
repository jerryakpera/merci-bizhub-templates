import { useDispatch } from 'react-redux';
import { useContext, useState } from 'react';

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
import { useToast } from '@/hooks/use-toast';

import { ProductDialog } from '../ProductDialog';
import { ProductForm } from '../forms/ProductForm';
import { Product } from '@/features/products/products-types';

import { AppDispatch } from '@/app/stores';
import { saveProduct } from '../../products-thunk';
import { AuthContext } from '@/contexts/AuthContext';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProductsDataTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useContext(AuthContext);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [addProductDialogOpen, setAddProductDialogOpen] =
    useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleAddProduct = (newProduct: Partial<Product>) => {
    const currentTimestamp = Date.now();
    const createdBy = user?.email || '';
    const updatedBy = createdBy;

    const product: Product = {
      id: String(currentTimestamp),
      price: Number(newProduct.price),
      genPrice: Number(newProduct.genPrice),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      createdBy,
      updatedBy,
      category: newProduct.category || 'Service',
      productName: newProduct.productName || '',
    };

    // Dispatch the saveProduct thunk to save the product
    dispatch(saveProduct(product))
      .unwrap()
      .then(() => {
        toast({
          title: 'Product successfully added',
          description: `${product.productName} - N${product.price} (N${product.genPrice})`,
        });

        setAddProductDialogOpen(false);
      })
      .catch((error) => {
        toast({
          title: 'Product was not added',
          description: error,
        });
      });
  };

  return (
    <div>
      <div className='flex items-center py-4 justify-between'>
        <Input
          placeholder='Filter products...'
          value={
            (table.getColumn('productName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('productName')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />

        <ProductDialog
          title='Add a product'
          buttonLabel='Add Product'
          isOpen={addProductDialogOpen}
          setIsOpen={setAddProductDialogOpen}
          description='Fill in the form correctly to add a new product.'
        >
          <ProductForm handleFormSubmit={handleAddProduct} />
        </ProductDialog>
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

      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
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
  );
}
