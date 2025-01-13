import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../product/interfaces/product.interface';
import { Order } from './interfaces/cart.interface';
import { OrderStatus } from './enums/order.enum';
import { v4 as uuidv4 } from 'uuid';
import { map, Observable } from 'rxjs';
import { OrderService } from '../../api/orders/orders.service';
import { Payment } from './interfaces/payment.interface';
import { mapPayments } from './serializers/payments';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  private orderService = inject(OrderService);

  order = signal<Order>({
    uuid: uuidv4(),
    items: [],
    totalAmount: 0,
    statusId: OrderStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  constructor() {
    this.loadStore();
  }

  addProduct(product: Product, quantity: number) {
    this.order.update((order) => {
      order?.items.push({
        uuid: uuidv4(),
        product: product,
        quantity: quantity,
        price: product.price,
      });

      return { ...order };
    });
    this.saveStore();
  }

  changeQuantity(itemUUID: string, quantity: number) {
    this.order.update((order) => {
      if (!quantity) {
        order.items = order.items.filter((item) => item.uuid !== itemUUID);
      } else {
        order.items.forEach((item) => {
          if (item.uuid === itemUUID) {
            item.quantity = quantity;
          }
        });
      }

      return { ...order };
    });
    this.saveStore();
  }

  getPayments(): Observable<Payment[]> {
    return this.orderService
      .getPayments()
      .pipe(map((response) => mapPayments(response)));
  }

  private saveStore() {
    localStorage.setItem('order', JSON.stringify(this.order()));
  }

  private loadStore() {
    const order = localStorage.getItem('order');
    if (order) {
      this.order.set(JSON.parse(order));
    }
  }
}
