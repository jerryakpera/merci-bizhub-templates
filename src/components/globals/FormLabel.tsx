import { Label } from '@/components/ui/label';

type Props = {
  label: string;
  htmlForText: string;
};

export const FormLabel = ({ label, htmlForText }: Props) => {
  return (
    <Label
      htmlFor={htmlForText}
      className='text-sm text-zinc-500'
    >
      {label}
    </Label>
  );
};
