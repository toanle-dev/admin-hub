import { inject, Injectable } from '@angular/core';
import { CategoriesService } from '../../api/categories/categories.service';
import { ProductsService } from '../../api/products/products.service';

import { map, Observable } from 'rxjs';
import { CreateCategory } from '../../api/categories/interfaces/create-category.interface';
import { UpdateCategory } from '../../api/categories/interfaces/update-category.interface';
import { Category } from './interfaces/category.interface';
import { GroupedProducts, Product } from './interfaces/product.interface';
import { mapCategoryById } from './serializers/find-category';
import { mapProductById } from './serializers/list-by-id';
import { mapCategories } from './serializers/list-categories';
import { mapGroupedProducts } from './serializers/list-grouped-products';
import { mapProducts } from './serializers/list-products';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private readonly products = inject(ProductsService);
  private readonly categories = inject(CategoriesService);

  listProducts(): Observable<Product[]> {
    return this.products.listProducts().pipe(map((res) => mapProducts(res)));
  }

  listGroupedProducts(order: string[] = []): Observable<GroupedProducts> {
    return this.products.listProducts().pipe(
      map((res) => {
        const result = mapGroupedProducts(res);

        if (!order.length) {
          return result;
        }

        // Ordena objeto pela categoria
        const sortedObj: GroupedProducts = {};

        // Adiciona as propriedades que estão na ordem especificada
        order.forEach((key) => {
          if (result.hasOwnProperty(key)) {
            sortedObj[key] = result[key];
          }
        });

        // Adiciona as propriedades que não estavam na ordem especificada (mantendo a ordem original)
        Object.keys(result).forEach((key) => {
          if (!sortedObj.hasOwnProperty(key)) {
            sortedObj[key] = result[key];
          }
        });

        return sortedObj;
      }),
    );
  }

  findProduct(productId: number): Observable<Product> {
    return this.products
      .findOne(productId)
      .pipe(map((res) => mapProductById(res)));
  }

  createProduct(data: FormData): Observable<any> {
    return this.products.createProduct(data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.products.deleteProduct(id);
  }

  updateProduct(id: number, data: FormData): Observable<any> {
    return this.products.updateProduct(id, data);
  }

  downloadProductImage(productId: number): Observable<Blob> {
    return this.products.downloadImage(productId);
  }

  listCategories(): Observable<Category[]> {
    return this.categories
      .listCategories()
      .pipe(map((res) => mapCategories(res)));
  }

  findCategory(categoryId: number): Observable<Category> {
    return this.categories
      .findOne(categoryId)
      .pipe(map((res) => mapCategoryById(res)));
  }

  createCategory(category: CreateCategory): Observable<any> {
    return this.categories.createCategory(category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.categories.deleteCategory(id);
  }

  updateCategory(id: number, category: UpdateCategory): Observable<any> {
    return this.categories.updateCategory(id, category);
  }
}
