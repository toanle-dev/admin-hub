import { inject, Injectable } from '@angular/core';
import { ProductsService } from '../../api/products/products.service';
import { CategoriesService } from '../../api/categories/categories.service';

import { mapProducts } from './serializers/list-products';
import { map, Observable } from 'rxjs';
import { GroupedProducts, Product } from './interfaces/product.interface';
import { mapCategories } from './serializers/list-categories';
import { Category } from './interfaces/category.interface';
import { mapProductById } from './serializers/list-by-id';
import { CreateCategory } from '../../api/categories/interfaces/create-category.interface';
import { UpdateCategory } from '../../api/categories/interfaces/update-category.interface';
import { mapCategoryById } from './serializers/find-category';
import { UpdateProduct } from '../../api/products/interfaces/update-product.interface';
import { mapGroupedProducts } from './serializers/list-grouped-products';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private readonly products = inject(ProductsService);
  private readonly categories = inject(CategoriesService);

  listProducts(): Observable<Product[]> {
    return this.products.listProducts().pipe(map((res) => mapProducts(res)));
  }

  listGroupedProducts(): Observable<GroupedProducts> {
    return this.products
      .listProducts()
      .pipe(map((res) => mapGroupedProducts(res)));
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

  updateProduct(id: number, product: UpdateProduct): Observable<any> {
    return this.products.updateProduct(id, product);
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
