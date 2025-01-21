import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckoutFacade } from '../../../facade/checkout/checkout.facade';
import { Order } from '../../../facade/checkout/interfaces/order.interface';
import { ModalService } from '../../../core/ui/modal/modal.service';
import { OrderDetailComponent } from '../view/order-detail/order-detail.component';

import { OrderStatus } from '../../../api/orders/enums/order.enum';

@Component({
  selector: 'app-table-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-orders.component.html',
  styleUrl: './table-orders.component.scss',
})
export class TableOrdersComponent implements AfterViewInit {
  private checkout = inject(CheckoutFacade);
  private modal = inject(ModalService);

  orders = signal<Order[]>([]);

  ngAfterViewInit(): void {
    this.loadData();
  }

  viewOrderDetails(orderId: number) {
    const refreshData = () => {
      this.modal.close();
      this.loadData();
    };

    this.modal.open(OrderDetailComponent, (component) => {
      component.order = this.orders().find((o) => o.id == orderId)!;
      component.confirm.subscribe(() => refreshData());
      component.refused.subscribe(() => refreshData());
    });
  }

  statusButton(status: OrderStatus): string {
    let css = '';
    switch (status) {
      case OrderStatus.CONFIRMED:
        css = '!btn-success';
        break;
      case OrderStatus.PENDING:
        css = '!btn-error';

        break;
      case OrderStatus.REFUSED:
        css = '!btn-warning';
        break;
    }
    return css;
  }

  private loadData() {
    this.checkout.listOrders().subscribe((orders) => {
      this.orders.set(orders);
    });
  }
}
