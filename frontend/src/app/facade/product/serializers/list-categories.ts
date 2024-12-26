import { Category } from '../interfaces/category.interface';

export const mapCategories = (res: any[]): Category[] => {
  return res.map((value) => {
    const category: Category = {
      id: value.id,
      name: value.name,
    };
    return category;
  });
};
