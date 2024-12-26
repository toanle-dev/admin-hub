export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
}
