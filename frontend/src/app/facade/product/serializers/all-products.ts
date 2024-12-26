import { Product } from '../interfaces/product.interface';

export const mapProducts = (res: any[]): Product[] => {
  return res.map((value) => {
    const data: Product = {
      id: value.id,
      categoryId: value.categoryId,
      name: value.name,
      description: value.description,
      price: value.price,
      stock: value.stock,
      imageUrl: value.imageUrl,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      category: value.category,
    };
    return data;
  });
};
