type Props = {
  hint: string;
};

export const FieldHint = ({ hint }: Props) => {
  return <div className='text-xs text-gray-500'>{hint}</div>;
};
