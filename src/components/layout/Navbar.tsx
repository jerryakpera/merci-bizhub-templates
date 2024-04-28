import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react/dist/iconify.js';

export const Navbar = () => {
  return (
    <div className='w-full h-12 bg-secondary-800'>
      <div className='w-full h-full flex justify-between items-center px-2 md:w-11/12 md:mx-auto lg:w-5/6'>
        <div>
          <Link
            to='/'
            className='flex gap-x-2 text-white items-center'
          >
            <Icon
              icon='ri:home-fill'
              className='text-xl'
            />
            <span className='font-semibold uppercase tracking-wider'>
              Merci
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
