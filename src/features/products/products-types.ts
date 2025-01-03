export interface Product {
  id: string;
  price: number;
  genPrice: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  productName: string;
}

export interface NewProduct {
  price: number;
  genPrice: number;
  productName: string;
}
