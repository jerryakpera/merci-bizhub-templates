import { ReactNode } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  buttonLabel?: string;
  buttonIcon?: string;
  description?: string;
  setIsOpen: (val: boolean) => void;
};

export const GlobalDialog = (props: Props) => {
  const {
    children,
    isOpen,
    setIsOpen,
    buttonLabel,
    title,
    description,
    buttonIcon,
  } = props;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button size={buttonIcon ? 'icon' : 'sm'}>
          {buttonLabel ? buttonLabel : <Icon icon={buttonIcon || ''}></Icon>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription className='text-xs'>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
