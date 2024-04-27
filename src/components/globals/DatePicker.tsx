import { Icon } from '@iconify/react/dist/iconify.js';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export function DatePicker({ date, setDate }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size='icon'
          className='px-2'
        >
          <Icon
            icon='material-symbols-light:today'
            className='text-xl'
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          initialFocus
          selected={date}
          onSelect={(date) => setDate(date)}
        />
      </PopoverContent>
    </Popover>
  );
}

// const [date, setDate] = React.useState<Date>();
