export type ProductCategory = "국내" | "해외";

export interface Product {
  _id: string;
  title: string;
  category: ProductCategory;
  price: number;
  duration: string;
  description: string;
  image: string;
  rating: number;
}

export interface ProductsResponse {
  items: Product[];
  count: number;
}