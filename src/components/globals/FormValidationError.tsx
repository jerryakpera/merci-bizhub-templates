import { FieldError } from 'react-hook-form';

type Props = {
  error: FieldError;
};

export const FormValidationError = ({ error }: Props) => {
  return <div className='text-xs text-red-500'>{error.message}</div>;
};
