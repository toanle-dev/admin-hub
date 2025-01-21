import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../product/interfaces/product.interface';
import { DeliveryAddress, Order } from './interfaces/cart.interface';

import { v4 as uuidv4 } from 'uuid';
import { map, Observable, tap } from 'rxjs';
import { OrderService } from '../../api/orders/orders.service';
import { Payment } from './interfaces/payment.interface';
import { mapPayments } from './serializers/payments';
import { StorageService } from '../../core/providers/storage/storage.service';
import { StorageKeys } from '../../core/providers/storage/storage.enum';
import { OrderStatus } from '../../api/orders/enums/order.enum';
import { mapListOrders } from './serializers/list-orders';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  private orderService = inject(OrderService);
  private storage = inject(StorageService);

  order = signal<Order>({
    uuid: uuidv4(),
    items: [],
    statusId: OrderStatus.PENDING,
    deliveryAddress: null,
    payment: null,
    change: 0,
    phoneContact: '',
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

  setPhoneContact(phone: string) {
    this.order.update((order) => {
      order.phoneContact = phone.replaceAll(/[^0-9]/g, '');
      return { ...order };
    });
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
    return this.orderService
      .createOrder({
        phoneContact: this.order().phoneContact,
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
          // Lembra o último telefone de contato
          this.storage.set(StorageKeys.phoneContact, this.order().phoneContact);

          // Encerra pedido no checkout para proximo pedido
          this.storage.remove(StorageKeys.order);
          this.order.set({
            uuid: uuidv4(),
            items: [],
            statusId: OrderStatus.PENDING,
            deliveryAddress: this.order().deliveryAddress,
            payment: this.order().payment,
            change: 0,
            phoneContact: this.order().phoneContact,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          this.saveStore();
        })
      );
  }

  listOrders(phone: string) {
    return this.orderService
      .getOrdersByContact(phone)
      .pipe(map((json) => mapListOrders(json)));
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
