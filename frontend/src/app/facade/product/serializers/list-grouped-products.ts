import { GroupedProducts, Product } from '../interfaces/product.interface';

export const mapGroupedProducts = (res: any[]): GroupedProducts => {
  const groupByCategory = (items: Product[]): GroupedProducts => {
    return items.reduce<GroupedProducts>((acc, item) => {
      if (!acc[item.category.name]) {
        acc[item.category.name] = [];
      }
      acc[item.category.name].push(item);
      return acc;
    }, {});
  };

  const products = res.map((value) => {
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

  return groupByCategory(products);
};
