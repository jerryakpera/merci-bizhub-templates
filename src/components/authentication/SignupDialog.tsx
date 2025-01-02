import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { Signup } from './Signup';

export const SignupDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-secondary w-full md:w-auto'>Sign up</Button>
      </DialogTrigger>
      <DialogContent className='h-full sm:h-auto'>
        <DialogHeader className='text-left'>
          <DialogTitle>Signup</DialogTitle>
          <DialogDescription>Create your Merci Bizhub.</DialogDescription>
        </DialogHeader>
        <Signup />
      </DialogContent>
    </Dialog>
  );
};
