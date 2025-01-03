export type ProductCategory = 'Service' | 'Product';

export interface Product {
  id: string;
  price: number;
  genPrice: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  productName: string;
  category: ProductCategory;
}

export const productCategoryOptions = ['Service', 'Product'];
