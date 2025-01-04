import { BeatLoader } from 'react-spinners';

export const LoadingScreen = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <BeatLoader size={10} />
    </div>
  );
};
