import { inject, Injectable } from '@angular/core';
import { ProductsService } from '../../api/products/products.service';
import { CategoriesService } from '../../api/categories/categories.service';

import { mapProducts } from './serializers/all-products';
import { map, Observable } from 'rxjs';
import { Product } from './interfaces/product.interface';
import { mapCategories } from './serializers/list-categories';
import { CreateProduct } from '../../api/products/interfaces/create-product.interface';
import { UpdateProduct } from '../../api/products/interfaces/update-product.interface';
import { Category } from './interfaces/category.interface';
import { mapProductById } from './serializers/list-by-id';
import { CreateCategory } from '../../api/categories/interfaces/create-category.interface';
import { UpdateCategory } from '../../api/categories/interfaces/update-category.interface';
import { mapCategoryById } from './serializers/find-category';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private readonly products = inject(ProductsService);
  private readonly categories = inject(CategoriesService);

  listProducts(): Observable<Product[]> {
    return this.products.listProducts().pipe(map((res) => mapProducts(res)));
  }

  findProduct(productId: number): Observable<Product> {
    return this.products
      .findOne(productId)
      .pipe(map((res) => mapProductById(res)));
  }

  createProduct(product: CreateProduct): Observable<any> {
    return this.products.createProduct(product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.products.deleteProduct(id);
  }

  updateProduct(id: number, product: UpdateProduct): Observable<any> {
    return this.products.updateProduct(id, product);
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
