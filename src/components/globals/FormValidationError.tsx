import { FieldError } from 'react-hook-form';

type Props = {
  error: FieldError;
};

export const FormValidationError = ({ error }: Props) => {
  return <div className='text-xs text-red-500 mb-0.5'>{error.message}</div>;
};
