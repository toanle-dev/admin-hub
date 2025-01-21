import { inject, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBase } from '../api.base';
import { environment } from '../../../environments/environment';
import { CreateOrder } from './interfaces/create-order.interface';
import { StorageKeys } from '../../core/providers/storage/storage.enum';
import { StorageService } from '../../core/providers/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends ApiBase {
  private storage = inject(StorageService);
  private zone = inject(NgZone);

  constructor(http: HttpClient) {
    super(http, {
      host: environment.apiUrl + 'orders',
    });
  }

  getOrders(): Observable<any[]> {
    return this.fetch('');
  }

  getOrdersByContact(phone: string): Observable<any[]> {
    return this.fetch('contact/' + phone);
  }

  createOrder(order: CreateOrder): Observable<any> {
    return this.post('', order);
  }

  updateStatus(orderId: number, statusId: number) {
    return this.partialUpdate(String(orderId) + '/status', {
      statusId: statusId,
    });
  }

  getPayments(): Observable<any[]> {
    return this.fetch('payments');
  }

  listenOrders(): Observable<MessageEvent> {
    return new Observable((observer) => {
      const url =
        environment.apiUrl +
        'orders/updates?token=' +
        this.storage.get(StorageKeys.token);

      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        // Garantir que a mudança de estado é detectada pelo Angular
        this.zone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = (error) => {
        this.zone.run(() => {
          observer.error(error);
        });
      };

      return () => {
        eventSource.close(); // Fechar a conexão quando não for mais necessário
      };
    });
  }
}
