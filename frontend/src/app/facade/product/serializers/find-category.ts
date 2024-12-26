import { Category } from '../interfaces/category.interface';

export const mapCategoryById = (res: any): Category => {
  const data: Category = {
    id: res.id,
    name: res.name,
  };

  return data;
};
