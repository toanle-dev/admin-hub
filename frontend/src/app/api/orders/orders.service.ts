import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBase } from '../api.base';
import { environment } from '../../../environments/environment';
import { CreateOrder } from './interfaces/create-order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends ApiBase {
  private apiUrl = 'https://api.example.com/orders';

  constructor(http: HttpClient) {
    super(http, {
      host: environment.apiUrl + 'orders',
    });
  }

  getOrders(): Observable<any[]> {
    return this.fetch('');
  }

  createOrder(userId: number, data: CreateOrder): Observable<any> {
    // {
    //     "items": [
    //         {
    //             "productId": 1,
    //             "quantity": 2
    //         }
    //     ]
    // }
    return this.post(String(userId), data);
  }

  updateStatus(orderId: number, statusId: number): Observable<any> {
    return this.update(String(orderId) + '/status', {
      statusId,
    });
  }

  getPayments(): Observable<any[]> {
    return this.fetch('payments');
  }
}
