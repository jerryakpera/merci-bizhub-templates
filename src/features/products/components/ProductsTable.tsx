import { Product } from '../products-types';
import { ProductsDataTable } from './products-table/products-data-table';
import { productTableColumns } from './products-table/products-table-columns';

type Props = {
  products: Product[];
  tableCaption: string;
};

export const ProductsTable = (props: Props) => {
  const { products } = props;

  return (
    <ProductsDataTable
      data={products}
      columns={productTableColumns}
    />
  );
};
