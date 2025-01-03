import { FieldError } from 'react-hook-form';

type Props = {
  fieldError: FieldError;
};

export const FormValidationError = ({ fieldError }: Props) => {
  if (!fieldError) return null;

  return (
    <div className='text-xs font-semibold dark:text-red-500 text-red-600'>
      {fieldError.message}
    </div>
  );
};
