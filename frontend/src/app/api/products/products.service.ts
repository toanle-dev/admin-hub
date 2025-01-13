import { Injectable } from '@angular/core';
import { ApiBase } from '../api.base';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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

  createProduct(data: FormData): Observable<any> {
    return this.post('', data);
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

  downloadImage(productId: number): Observable<Blob> {
    return this.fetch('download/' + productId, {
      responseType: 'blob',
    });
  }
}
