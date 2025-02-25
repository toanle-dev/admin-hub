import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderStatus } from '../../api/orders/enums/order.enum';
import { OrderService } from '../../api/orders/orders.service';
import { Order } from './interfaces/order.interface';
import { mapOrders } from './serializers/list-orders';

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

  deliverOrder(orderId: number) {
    return this.orderService.updateStatus(orderId, OrderStatus.DELIVERED);
  }

  refusedOrder(orderId: number) {
    return this.orderService.updateStatus(orderId, OrderStatus.REFUSED);
  }

  finishOrder(orderId: number) {
    return this.orderService.updateStatus(orderId, OrderStatus.COMPLETED);
  }
}
