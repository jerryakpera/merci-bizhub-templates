export type ProductCategory = 'Service' | 'Product';

export interface Product {
  id: string;
  price: number;
  stock?: number;
  genPrice: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  favorite?: boolean;
  firebaseId?: string;
  productName: string;
  category: ProductCategory;
}

export const productCategoryOptions = ['Service', 'Product'];
