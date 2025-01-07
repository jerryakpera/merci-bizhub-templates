import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

type Props = {
  isOpen: boolean;
  selectedDate: Date | null;
  setIsOpen: (val: boolean) => void;
  setSelectedDate: (val: Date | null) => void;
};

export const CalendarDialog = (props: Props) => {
  const { isOpen, setIsOpen, selectedDate, setSelectedDate } = props;

  const handleClearFilter = () => {
    setSelectedDate(null);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button variant='outline'>Filter Date</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Filter dates</DialogTitle>
          <DialogDescription>
            Select a date (range) to filter.
          </DialogDescription>
        </DialogHeader>
        <Calendar
          mode='single'
          selected={selectedDate || new Date()}
          className='rounded-md border shadow w-full'
          onSelect={(day) => day && setSelectedDate(day)}
        />
        <DialogFooter>
          <Button onClick={handleClearFilter}>Clear filter</Button>
          <Button
            onClick={() => setIsOpen(false)}
            className='bg-blue-700 text-white hover:bg-blue-800 duration-75'
          >
            Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
