import { useState } from 'react';

import { Sale } from '@/features/sales/sales-types';
import { SaleDialog } from '@/features/sales/components/SaleDialog';
import { SingleSale } from '@/features/sales/components/SingleSale';

type Props = {
  sale: Sale;
};

export const ViewSale = ({ sale }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SaleDialog
      isOpen={isOpen}
      title='View sale'
      setIsOpen={setIsOpen}
      buttonIcon='raphael:view'
      description='View details about sale.'
    >
      <SingleSale sale={sale} />
    </SaleDialog>
  );
};
