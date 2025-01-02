import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from '@/components/ui/table';

import { Product } from '../products-types';
import { NairaSign } from '@/components/global';

type Props = {
  products: Product[];
  tableCaption: string;
};

export const ProductsTable = (props: Props) => {
  const { products, tableCaption } = props;

  return (
    <Table>
      <TableCaption>
        {tableCaption ? tableCaption : 'Products Table'}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=''>Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Gen Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.productName}</TableCell>
            <TableCell>
              <NairaSign />
              {product.price}
            </TableCell>
            <TableCell>
              <NairaSign />
              {product.genPrice}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
