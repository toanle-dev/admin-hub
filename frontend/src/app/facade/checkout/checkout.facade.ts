import { inject, Injectable } from '@angular/core';
import { OrderService } from '../../api/orders/orders.service';
import { map, Observable } from 'rxjs';
import { mapOrders } from './serializers/list-orders';
import { Order } from './interfaces/order.interface';
import { OrderStatus } from '../../api/orders/enums/order.enum';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFacade {
  private orderService = inject(OrderService);

  listOrders(): Observable<Order[]> {
    return this.orderService.getOrders().pipe(map((data) => mapOrders(data)));
  }

  confirmOrder(orderId: number) {
    return this.orderService.updateStatus(orderId, OrderStatus.CONFIRMED);
  }

  refusedOrder(orderId: number) {
    return this.orderService.updateStatus(orderId, OrderStatus.REFUSED);
  }
}
