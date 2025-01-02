import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';

import { inputStyle } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { AuthContext } from '@/contexts/AuthContext';
import { Spinner, FormValidationError } from '@/components/global';

import { whitelistEmails } from '@/data/valid-emails';

type SignupFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Signup = () => {
  const navigate = useNavigate();

  const {
    setUser,
    handleGoogleSignin,
    register: registerUser,
  } = useContext(AuthContext);

  const [errorText, setErrorText] = useState('');

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const password = watch('password', '');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  const validateConfirmPassword = (value: string) => {
    if (value === password) {
      return true;
    } else {
      return 'Passwords do not match';
    }
  };

  const onSubmit: SubmitHandler<SignupFields> = async (signupData) => {
    try {
      setErrorText('');

      const signupPayload: {
        email: string;
        password: string;
      } = {
        email: signupData.email,
        password: signupData.password,
      };

      const user = await registerUser(signupPayload);

      setUser(user);
      navigate('/');
    } catch (e) {
      let errorMessage = 'Something went wrong.';

      if (e instanceof Error) {
        switch (e.message) {
          case 'Firebase: Error (auth/invalid-email).':
            errorMessage = 'Invalid email address format.';
            break;
          case 'Firebase: Error (auth/user-disabled).':
            errorMessage = 'This user has been disabled.';
            break;
          case 'Firebase: Error (auth/email-already-in-use).':
            errorMessage = 'Email already in use.';
            break;
          case 'Firebase: Error (auth/missing-email).':
            errorMessage = 'Email is missing.';
            break;
          default:
            errorMessage = e.message;
        }
      }

      setErrorText(errorMessage);
    }
  };

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorText && (
        <Alert className='mb-3 bg-red-300 text-black'>
          <Icon
            icon='material-symbols-light:error-outline'
            className='text-xl text-black -mt-0.5'
          />
          <AlertTitle>{errorText}</AlertTitle>
        </Alert>
      )}

      <div className='grid gap-4'>
        <div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='max@example.com'
              {...register('email', {
                required: 'Enter your email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address format',
                },
              })}
              className={inputStyle(errors.email)}
            />
          </div>
          <FormValidationError fieldError={errors.email as FieldError} />
        </div>
        <div>
          <div>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              {...register('password', {
                required: 'You must enter a password',
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    'Password must be at least 8 characters long and contain at least 1 number, 1 special character, 1 uppercase letter, and 1 lowercase letter',
                },
              })}
              className={inputStyle(errors.password)}
            />
          </div>
          <FormValidationError fieldError={errors.password as FieldError} />
        </div>
        <div>
          <div>
            <Label htmlFor='confirmPassword'>Confirm password</Label>
            <Input
              type='password'
              id='confirmPassword'
              {...register('confirmPassword', {
                required: 'You must confirm your password',
                validate: validateConfirmPassword,
              })}
              className={inputStyle(errors.confirmPassword)}
            />
          </div>
          <FormValidationError
            fieldError={errors.confirmPassword as FieldError}
          />
        </div>
        <div className='flex items-center space-x-2'>
          <input
            id='terms'
            type='checkbox'
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />
          <label
            htmlFor='terms'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Accept Terms and Conditions
          </label>
        </div>

        <div className='space-y-2'>
          {!agreedToTerms && (
            <div className='text-sm text-gray-800 font-semibold'>
              You must agree to our Terms and Conditions
            </div>
          )}
          <Button
            type='submit'
            className='w-full'
            disabled={
              !isValid ||
              !agreedToTerms ||
              isSubmitting ||
              !whitelistEmails.includes(watch('email'))
            }
          >
            Create an account{' '}
            {isSubmitting && (
              <div className='ml-2'>
                <Spinner />
              </div>
            )}
          </Button>
          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={handleGoogleSignin}
            disabled={
              !agreedToTerms ||
              isSubmitting ||
              !whitelistEmails.includes(watch('email'))
            }
          >
            Sign up with Google
            <Icon
              icon='devicon:google'
              className='ml-2 text-xl'
            />
          </Button>
        </div>
      </div>
    </form>
  );
};
