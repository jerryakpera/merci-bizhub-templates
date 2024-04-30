import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200'>
      <Link
        to='/'
        className='mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900'
      >
        Home
      </Link>
      <Link
        to='/'
        className='mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900'
      >
        Features
      </Link>
      <Link
        to='/'
        className='mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900'
      >
        Pricing
      </Link>
      <Link
        to='/'
        className='mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900'
      >
        Blog
      </Link>
    </nav>
  );
};
