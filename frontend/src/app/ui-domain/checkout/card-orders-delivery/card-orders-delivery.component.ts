import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { OrderStatus } from '../../../api/orders/enums/order.enum';
import { OrderService } from '../../../api/orders/orders.service';
import { CheckoutFacade } from '../../../facade/checkout/checkout.facade';
import { Order } from '../../../facade/checkout/interfaces/order.interface';

@Component({
  selector: 'app-card-orders-delivery',
  standalone: true,
  imports: [],
  templateUrl: './card-orders-delivery.component.html',
  styleUrl: './card-orders-delivery.component.scss',
})
export class CardOrdersDeliveryComponent implements AfterViewInit {
  private checkout = inject(CheckoutFacade);
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);

  ngAfterViewInit(): void {
    this.loadData();
  }

  private loadData() {
    const loadOrders = () =>
      this.checkout.listOrders().subscribe((orders) => {
        this.orders.set(
          orders.filter((o) => o.status.id == OrderStatus.DELIVERED),
        );
      });

    loadOrders();

    this.orderService.listenOrders().subscribe(() => loadOrders());
  }
}
