export interface ProductImage {
  id?: number;
  url: string;
}

export interface Product {
  id?: number;
  sku: string;
  name: string;
  price: number;
  images: ProductImage[];
  createdAt?: string;
}
