import { Injectable } from '@angular/core';
import { ApiBase } from '../api.base';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateCategory } from './interfaces/create-category.interface';
import { UpdateCategory } from './interfaces/update-category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends ApiBase {
  constructor(http: HttpClient) {
    super(http, {
      host: environment.apiUrl + 'categories',
    });
  }

  listCategories(): Observable<any> {
    return this.fetch('');
  }

  findOne(categoryId: number): Observable<any> {
    return this.fetch(String(categoryId));
  }

  createCategory(category: CreateCategory): Observable<any> {
    return this.post('', category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.delete(String(id));
  }

  updateCategory(
    categoryId: number,
    category: UpdateCategory
  ): Observable<any> {
    return this.update(String(categoryId), category);
  }
}
