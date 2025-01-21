import { Component, inject, output } from '@angular/core';
import { Order } from '../../../../facade/checkout/interfaces/order.interface';
import { CommonModule } from '@angular/common';
import { CheckoutFacade } from '../../../../facade/checkout/checkout.facade';
import { ButtonComponent } from '../../../../core/ui/button/button.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  private checkout = inject(CheckoutFacade);

  order!: Order;
  confirm = output();
  refused = output();

  refusedOrder() {
    this.checkout.refusedOrder(this.order.id).subscribe({
      next: (value) => this.refused.emit(),
      error: (err) => console.log('Error ao recusar pedido', err),
    });
  }

  confirmOrder() {
    this.checkout.confirmOrder(this.order.id).subscribe({
      next: (value) => this.confirm.emit(),
      error: (err) => console.log('Error confirmar pedido', err),
    });
  }
}
