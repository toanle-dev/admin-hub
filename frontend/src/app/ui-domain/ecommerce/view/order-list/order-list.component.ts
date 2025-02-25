import { AfterViewInit, Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartFacade } from '../../../../facade/cart/cart.facade';
import { ViewOrder } from '../../../../facade/cart/interfaces/view-order.interface';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements AfterViewInit {
  private cart = inject(CartFacade);

  viewOrders = signal<ViewOrder[]>([]);

  ngAfterViewInit(): void {
    this.cart.listOrders().subscribe((viewOrder) => {
      this.viewOrders.set(viewOrder);
    });

    this.cart.listenOrdersChanges().subscribe((viewOrder) => {
      this.viewOrders.set(viewOrder);
    });
  }
}
