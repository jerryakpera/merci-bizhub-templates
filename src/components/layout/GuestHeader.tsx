import { Link } from 'react-router-dom';
import MerciLogo from '@/assets/logo.png';

import { LoginDialog } from '@/components/authentication/LoginDialog';
import { SignupDialog } from '@/components/authentication/SignupDialog';

export const GuestHeader = () => {
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
      </div>

      <div className='inline-flex items-center ml-5 space-x-3 lg:justify-end'>
        <LoginDialog />
        <SignupDialog />
      </div>
    </div>
  );
};
