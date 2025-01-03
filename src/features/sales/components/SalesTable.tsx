import { Sale } from '../sales-types';
import { SalesDataTable } from './sales-table/sales-data-table';
import { saleTableColumns } from './sales-table/sales-table-columns';

type Props = {
  sales: Sale[];
  tableCaption: string;
};

export const SalesTable = (props: Props) => {
  const { sales } = props;

  return (
    <SalesDataTable
      data={sales}
      columns={saleTableColumns}
    />
  );
};
