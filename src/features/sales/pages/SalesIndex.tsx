import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageHeader } from '@/components/global';
import { SalesTable } from '@/features/sales/components';

import { AppDispatch } from '@/app/stores';
import { fetchSales } from '../sales-thunk';
import { selectSales } from '@/features/sales/sales-slice';

export const SalesIndex = () => {
  const dispatch = useDispatch<AppDispatch>();

  const sales = useSelector(selectSales);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className='pb-12'>
      <PageHeader>
        <h1>Sales List</h1>
      </PageHeader>
      <SalesTable
        sales={sales}
        tableCaption='All sales offered by Merci Bizhub'
      />
    </div>
  );
};
