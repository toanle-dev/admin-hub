import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../product/interfaces/product.interface';
import { DeliveryAddress, Order } from './interfaces/cart.interface';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../../api/orders/enums/order.enum';
import { OrderService } from '../../api/orders/orders.service';
import { StorageKeys } from '../../core/providers/storage/storage.enum';
import { StorageService } from '../../core/providers/storage/storage.service';
import { Payment } from './interfaces/payment.interface';
import { ViewOrder } from './interfaces/view-order.interface';
import { mapListOrders } from './serializers/list-orders';
import { mapListenOrdersChanges } from './serializers/listen-orders-changes';
import { mapPayments } from './serializers/payments';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  private orderService = inject(OrderService);
  private storage = inject(StorageService);
  private jwtService = inject(JwtHelperService);

  order = signal<Order>({
    uuid: uuidv4(),
    items: [],
    statusId: OrderStatus.PENDING,
    deliveryAddress: null,
    payment: null,
    change: 0,
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

  setPayment(paymentId: number) {
    this.order.update((order) => {
      order.payment = { id: paymentId };
      return { ...order };
    });
    this.saveStore();
  }

  addAddress(address: DeliveryAddress) {
    this.order.update((order) => {
      order.deliveryAddress = address;
      return { ...order };
    });
    this.storage.set(StorageKeys.address, JSON.stringify(address));
    this.saveStore();
  }

  confirmOrder() {
    const token = this.jwtService.decodeToken();

    return this.orderService
      .createOrder({
        // TODO
        phoneContact: token.phone,
        paymentId: Number(this.order().payment?.id || 0),
        paymentValue: this.order().payment?.value || 0,
        items: this.order().items.map((d) => {
          return {
            price: d.price,
            productId: d.product.id,
            quantity: d.quantity,
          };
        }),

        deliveryAddress: {
          street: this.order().deliveryAddress?.street || '',
          city: this.order().deliveryAddress?.city || '',
          state: this.order().deliveryAddress?.state || '',
          postalCode: this.order().deliveryAddress?.postalCode || '',
          number: this.order().deliveryAddress?.number || '',
          country: '',
          complement: this.order().deliveryAddress?.complement || '',
        },
      })
      .pipe(
        tap(() => {
          // Encerra pedido no checkout para proximo pedido
          this.storage.remove(StorageKeys.order);
          this.order.set({
            uuid: uuidv4(),
            items: [],
            statusId: OrderStatus.PENDING,
            deliveryAddress: this.order().deliveryAddress,
            payment: this.order().payment,
            change: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          this.saveStore();
        }),
      );
  }

  listOrders(): Observable<ViewOrder[]> {
    return this.orderService
      .getOrdersByContact()
      .pipe(map((json) => mapListOrders(json)));
  }

  listenOrdersChanges(): Observable<ViewOrder[]> {
    return this.orderService
      .listOrdersByUser()
      .pipe(map((res) => mapListenOrdersChanges(JSON.parse(res.data))));
  }

  private saveStore() {
    this.storage.set(StorageKeys.order, JSON.stringify(this.order()));
  }

  private loadStore() {
    const rawOrder = this.storage.get(StorageKeys.order);
    if (rawOrder) {
      const order: Order = JSON.parse(rawOrder);
      const rawAddress = this.storage.get(StorageKeys.address);
      if (rawAddress) {
        const address: DeliveryAddress = JSON.parse(rawAddress);
        order.deliveryAddress = address;
      }
      this.order.set(order);
    }
  }
}
