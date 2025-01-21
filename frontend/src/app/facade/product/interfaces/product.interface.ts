import { Category } from './category.interface';

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: null;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export type GroupedProducts = {
  [categoryName: string]: Product[];
};
