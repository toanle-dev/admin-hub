import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { NgxMaskPipe } from 'ngx-mask';
import { Subscription } from 'rxjs';
import { OrderStatus } from '../../../api/orders/enums/order.enum';
import { OrderService } from '../../../api/orders/orders.service';
import { ButtonComponent } from '../../../core/ui/button/button.component';
import { ModalService } from '../../../core/ui/modal/modal.service';
import { CheckoutFacade } from '../../../facade/checkout/checkout.facade';
import { Order } from '../../../facade/checkout/interfaces/order.interface';
import { OrderDetailComponent } from '../view/order-detail/order-detail.component';

@Component({
  selector: 'app-card-orders-delivery',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgxMaskPipe],
  templateUrl: './card-orders-delivery.component.html',
  styleUrl: './card-orders-delivery.component.scss',
})
export class CardOrdersDeliveryComponent implements AfterViewInit, OnDestroy {
  private checkout = inject(CheckoutFacade);
  private orderService = inject(OrderService);
  private modal = inject(ModalService);

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

  finishOrder(orderId: number) {
    this.checkout.finishOrder(orderId).subscribe({
      next: () => {},
      error: (err) => {
        console.log(err);
        alert('Erro ao finalizar pedido');
      },
    });
  }

  private loadData() {
    const loadOrders = () =>
      this.subscriptions.add(
        this.checkout.listOrders().subscribe((orders) => {
          this.orders.set(
            orders.filter((o) => o.status.id == OrderStatus.DELIVERED),
          );
        }),
      );

    loadOrders();

    this.subscriptions.add(
      this.orderService.listenOrders().subscribe(() => loadOrders()),
    );
  }
}
