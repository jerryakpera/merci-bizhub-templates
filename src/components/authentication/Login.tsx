import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { AuthContext } from '@/contexts/AuthContext';
import { FormValidationError, Spinner } from '@/components/global';

type LoginFields = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, login, handleGoogleSignin } = useContext(AuthContext);

  const [errorText, setErrorText] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFields> = async (loginData) => {
    try {
      setErrorText('');

      const userCredential = await login(loginData);

      setUser(userCredential.user);

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
          case 'Firebase: Error (auth/user-not-found).':
            errorMessage = 'Incorrect email or password.';
            break;
          case 'Firebase: Error (auth/invalid-credential).':
            errorMessage = 'Incorrect email or password.';
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
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            {...register('email', {
              required: 'You must enter an email address',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address format',
              },
            })}
            placeholder='joe@example.com'
          />
          <FormValidationError fieldError={errors.email as FieldError} />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            {...register('password')}
          />
        </div>
        <div className='flex items-center'>
          <Link
            to='#'
            className='ml-auto inline-block text-sm underline'
          >
            Forgot your password?
          </Link>
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={!isValid || isSubmitting}
        >
          <div className='flex justify-center space-x-2 items-center'>
            <div>Login</div>

            {isSubmitting && <Spinner />}
          </div>
        </Button>
        <Button
          type='button'
          variant='outline'
          className='w-full'
          disabled={isSubmitting}
          onClick={handleGoogleSignin}
        >
          Login with Google
          <Icon
            icon='devicon:google'
            className='ml-2 text-xl'
          />
        </Button>
      </div>
    </form>
  );
};
