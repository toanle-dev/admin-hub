import { Product } from '../interfaces/product.interface';

export const mapProductById = (res: any): Product => {
  const data: Product = {
    id: res.id,
    categoryId: res.categoryId,
    name: res.name,
    description: res.description,
    price: res.price,
    stock: res.stock,
    imageUrl: res.imageUrl,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
    category: res.category,
  };

  return data;
};
