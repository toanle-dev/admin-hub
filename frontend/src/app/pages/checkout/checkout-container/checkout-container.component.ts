import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutFacade } from '../../../facade/checkout/checkout.facade';
import { OrderService } from '../../../api/orders/orders.service';
import { ModalComponent } from '../../../core/ui/modal/modal.component';
import { ModalService } from '../../../core/ui/modal/modal.service';

@Component({
  selector: 'app-checkout-container',
  standalone: true,
  imports: [RouterOutlet, ModalComponent],
  templateUrl: './checkout-container.component.html',
  styleUrl: './checkout-container.component.scss',
})
export class CheckoutContainerComponent implements OnInit, AfterViewInit {
  private order = inject(OrderService);
  private modalService = inject(ModalService);
  private modal = viewChild.required<ModalComponent>('modal');

  ngAfterViewInit(): void {
    this.modalService.create(this.modal());
  }

  ngOnInit(): void {
    this.order.listenOrders().subscribe({
      next: (data) => {
        console.log('Data Received', data);
      },
      error: (err) => {
        console.log('SSE Error', err);
      },
    });
  }
}
