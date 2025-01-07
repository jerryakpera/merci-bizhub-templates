import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/app/stores';

import { fetchSales } from '@/features/sales/sales-thunk';
import { fetchProducts } from '@/features/products/products-thunk';

import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Separator } from '@/components/ui/separator';

import { AppSidebar } from '@/components/layout';
import { LoadingOverlay } from '@/components/global/LoadingOverlay';

import { selectSalesStatus } from '@/features/sales/sales-slice';
import { selectProductsStatus } from '@/features/products/products-slice';

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const salesStatus = useSelector(selectSalesStatus);
  const productsStatus = useSelector(selectProductsStatus);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (salesStatus !== 'loading' && productsStatus !== 'loading') {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [salesStatus, productsStatus]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <LoadingOverlay loadingText='Getting things ready.' />
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
              <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator
                  orientation='vertical'
                  className='mr-2 h-4'
                />
                <Button
                  size='sm'
                  onClick={handleBack}
                >
                  <Icon
                    icon='solar:arrow-left-bold'
                    width='24'
                    height='24'
                  />
                </Button>
              </div>
            </header>

            <div className='px-4'>
              <Outlet />
              <Toaster />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )}
    </>
  );
};
