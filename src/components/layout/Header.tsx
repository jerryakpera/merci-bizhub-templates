import { Link } from 'react-router-dom';
import MerciLogo from '@/assets/logo.png';
// import { Navbar } from '@/components/layout/Navbar';

export const Header = () => {
  return (
    <div className='flex items-center justify-between md:flex-row'>
      <div className='relative flex'>
        <Link
          to='/'
          className='flex items-center font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center'
        >
          <span className='mx-auto text-xl font-black leading-none text-gray-900 select-none'>
            <img
              src={MerciLogo}
              className='w-28 sm:w-40'
            />
          </span>
        </Link>
        {/* <Navbar /> */}
      </div>

      <div className='inline-flex items-center ml-5 space-x-6 lg:justify-end'>
        <a
          href='#'
          className='inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          Sign in
        </a>
      </div>
    </div>
  );
};
