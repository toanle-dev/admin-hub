import { Component, inject, OnDestroy, signal } from '@angular/core';
import { OrderStatus } from '../../../api/orders/enums/order.enum';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../api/orders/orders.service';
import { ButtonComponent } from '../../../core/ui/button/button.component';
import { ModalService } from '../../../core/ui/modal/modal.service';
import { CheckoutFacade } from '../../../facade/checkout/checkout.facade';
import { Order } from '../../../facade/checkout/interfaces/order.interface';
import { OrderDetailComponent } from '../view/order-detail/order-detail.component';

@Component({
  selector: 'app-table-orders-confirmed',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './table-orders-confirmed.component.html',
  styleUrl: './table-orders-confirmed.component.scss',
})
export class TableOrdersConfirmedComponent implements OnDestroy {
  private checkout = inject(CheckoutFacade);
  private modal = inject(ModalService);
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  subscriptions = new Subscription();

  ngAfterViewInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  viewOrderDetails(orderId: number) {
    this.modal.open(OrderDetailComponent, (component) => {
      // Set order in modal
      component.order = this.orders().find((o) => o.id == orderId)!;
    });
  }

  deliverOrder(order: Order) {
    this.checkout.deliverOrder(order.id).subscribe({
      next: (value) => this.loadData(),
      error: (err) => (console.log(err), alert('Error confirmar pedido')),
    });
  }

  private loadData() {
    const loadOrders = () =>
      this.subscriptions.add(
        this.checkout.listOrders().subscribe((orders) => {
          this.orders.set(
            orders.filter((o) => o.status.id == OrderStatus.CONFIRMED),
          );
        }),
      );

    loadOrders();
    this.subscriptions.add(
      this.orderService.listenOrders().subscribe(() => loadOrders()),
    );
  }
}
