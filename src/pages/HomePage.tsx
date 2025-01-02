import { Icon } from '@iconify/react/dist/iconify.js';

export const HomePage = () => {
  return (
    <main>
      <section className='py-32 bg-white md:px-0'>
        <div className='containeritems-center max-w-6xl mx-auto'>
          <div className='flex flex-wrap items-center sm:-mx-3'>
            <div className='w-full md:w-1/2 md:px-3'>
              <div className='w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0'>
                <h1 className='text-2xl font-cursive font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl'>
                  <span className='block xl:inline'>Useful Tools to </span>
                  <span className='block xl:inline'>
                    Help You Work{' '}
                    <span className='underline font-sans font-bold tracking-narrow text-6xl text-primary'>
                      smarter
                    </span>{' '}
                    not Harder.
                  </span>
                </h1>
                <div className='relative flex flex-col sm:flex-row sm:space-x-4'>
                  <a
                    href='https://merci-bizhub.com/contact'
                    target='_blank'
                    className='flex items-center px-6 py-3 text-white bg-gray-600 rounded-md hover:bg-gray-700 hover:text-white'
                  >
                    Contact the developer
                    <Icon icon='formkit:arrowright' />
                  </a>
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/2'>
              <div className='w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl'>
                <img src='https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24'>
        <div className='box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16'>
          <div className='box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10'>
            <img
              src='https://cdn.devdojo.com/images/december2020/productivity.png'
              className='p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 '
            />
          </div>

          <div className='box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none'>
            <h2 className='m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl'>
              Boost Productivity
            </h2>
            <p className='pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg'>
              Build an atmosphere that creates productivity in your personal
              life and organization in your company culture.
            </p>
            <ul className='p-0 m-0 leading-6 border-0 border-gray-300'>
              <li className='box-border relative py-1 pl-0 text-left text-gray-500 border-solid'>
                <span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full'>
                  <span className='text-sm font-bold'>✓</span>
                </span>{' '}
                Maximize your productivity and growth
              </li>
              <li className='box-border relative py-1 pl-0 text-left text-gray-500 border-solid'>
                <span className='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full'>
                  <span className='text-sm font-bold'>✓</span>
                </span>{' '}
                Free your mind for ideas
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};
