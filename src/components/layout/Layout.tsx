import { Outlet } from 'react-router-dom';

import { Navbar } from './Navbar';

export const Layout = () => {
  return (
    <div>
      <Navbar />

      <div className='w-full h-full px-2 md:w-11/12 md:mx-auto lg:w-5/6 py-2'>
        <Outlet />
      </div>
    </div>
  );
};
