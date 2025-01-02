import { Outlet } from 'react-router-dom';

import { GuestHeader } from './GuestHeader';

export const GuestLayout = () => {
  return (
    <div>
      <div className='bg-zinc-200'>
        <div className='w-full px-2 md:w-11/12 md:mx-auto lg:w-5/6 py-3'>
          <GuestHeader />
        </div>
      </div>

      <div className='w-full h-full px-2 md:w-11/12 md:mx-auto lg:w-5/6 py-2'>
        <Outlet />
      </div>
    </div>
  );
};
