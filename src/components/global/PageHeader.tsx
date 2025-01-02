import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const PageHeader = (props: Props) => {
  const { children } = props;

  return (
    <div className='font-black text-lg uppercase tracking-wide'>{children}</div>
  );
};
