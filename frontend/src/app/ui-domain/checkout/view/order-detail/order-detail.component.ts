import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../core/ui/button/button.component';
import { ModalService } from '../../../../core/ui/modal/modal.service';
import { Order } from '../../../../facade/checkout/interfaces/order.interface';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  private modal = inject(ModalService);

  order!: Order;

  closeModal() {
    this.modal.close();
  }
}
