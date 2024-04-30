import { Label } from '../ui/label';

type Props = {
  label: string;
  selected: string;
  options: string[];
  setSelected: (val: string) => void;
};

export const MTSelect = ({ label, options, selected, setSelected }: Props) => {
  return (
    <div className='flex-1 flex flex-col'>
      <Label
        htmlFor='select-box'
        className='text-sm text-zinc-500'
      >
        {label}:
      </Label>
      <select
        id='select-box'
        defaultValue={selected}
        onChange={(e) => setSelected(e.target.value)}
        className='border border-gray-200 text-sm px-2 rounded-md py-[7px] drop-shadow-xs'
      >
        <option value=''>----------</option>
        {options.map((option) => {
          return (
            <option
              key={option}
              value={option.toLowerCase()}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
