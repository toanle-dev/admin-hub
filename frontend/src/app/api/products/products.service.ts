import { Injectable } from '@angular/core';
import { ApiBase } from '../api.base';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateProduct } from './interfaces/create-product.interface';
import { Observable } from 'rxjs';
import { UpdateProduct } from './interfaces/update-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiBase {
  constructor(http: HttpClient) {
    super(http, {
      host: environment.apiUrl + 'products',
    });
  }

  createProduct(product: CreateProduct): Observable<any> {
    return this.post('', product);
  }

  listProducts(): Observable<any> {
    return this.fetch('');
  }

  findOne(productId: number): Observable<any> {
    return this.fetch(String(productId));
  }

  updateProduct(productId: number, product: UpdateProduct): Observable<any> {
    return this.update(String(productId), product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.delete(String(productId));
  }
}
