import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageHeader } from '@/components/global';

import { AppDispatch } from '@/app/stores';
import { fetchSales } from '../sales-thunk';
import { selectSales } from '@/features/sales/sales-slice';

import { SalesDataTable } from '../components/sales-table/sales-data-table';
import { saleTableColumns } from '@/features/sales/components/sales-table/sales-table-columns';

export const SalesIndex = () => {
  const dispatch = useDispatch<AppDispatch>();

  const sales = useSelector(selectSales);

  const refetchSales = () => {
    dispatch(fetchSales());
  };

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className='pb-12'>
      <PageHeader>
        <h1>Sales List</h1>
      </PageHeader>
      <SalesDataTable
        data={sales}
        columns={saleTableColumns}
        refetchSales={refetchSales}
      />
    </div>
  );
};
