import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../core/ui/modal/modal.service';
import { CheckoutFacade } from '../../../facade/checkout/checkout.facade';
import { Order } from '../../../facade/checkout/interfaces/order.interface';
import { OrderDetailComponent } from '../view/order-detail/order-detail.component';

import { OrderStatus } from '../../../api/orders/enums/order.enum';
import { OrderService } from '../../../api/orders/orders.service';
import { ButtonComponent } from '../../../core/ui/button/button.component';

@Component({
  selector: 'app-table-orders-pendent',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './table-orders-pendent.component.html',
  styleUrl: './table-orders-pendent.component.scss',
})
export class TableOrdersPendentComponent implements AfterViewInit {
  private checkout = inject(CheckoutFacade);
  private orderService = inject(OrderService);
  private modal = inject(ModalService);

  orders = signal<Order[]>([]);

  ngAfterViewInit(): void {
    this.loadData();
  }

  viewOrderDetails(orderId: number) {
    this.modal.open(OrderDetailComponent, (component) => {
      // Set order in modal
      component.order = this.orders().find((o) => o.id == orderId)!;
    });
  }

  refusedOrder(order: Order) {
    this.checkout.refusedOrder(order.id).subscribe({
      next: (value) => this.loadData(),
      error: (err) => (console.log(err), alert('Error ao recusar pedido')),
    });
  }

  confirmOrder(order: Order) {
    this.checkout.confirmOrder(order.id).subscribe({
      next: (value) => this.loadData(),
      error: (err) => (console.log(err), alert('Error confirmar pedido')),
    });
  }

  private loadData() {
    const loadOrders = () =>
      this.checkout.listOrders().subscribe((orders) => {
        this.orders.set(
          orders.filter((o) => o.status.id == OrderStatus.PENDING),
        );
      });

    loadOrders();
    this.orderService.listenOrders().subscribe(() => loadOrders());
  }
}
