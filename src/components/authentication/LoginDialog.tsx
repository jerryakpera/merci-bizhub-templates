import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { Login } from './Login';

export const LoginDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full md:w-auto'>Log in</Button>
      </DialogTrigger>
      <DialogContent className='h-full sm:h-auto dark:text-white'>
        <DialogHeader className='text-left dark:text-white'>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Log into your Merci Bizhub account.
          </DialogDescription>
        </DialogHeader>
        <Login />
      </DialogContent>
    </Dialog>
  );
};
