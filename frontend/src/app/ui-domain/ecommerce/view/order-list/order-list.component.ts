import { Component, inject, model, signal } from '@angular/core';
import { InputComponent } from '../../../../core/ui/input/input.component';
import { ButtonComponent } from '../../../../core/ui/button/button.component';

import { CartFacade } from '../../../../facade/cart/cart.facade';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewOrder } from '../../../../facade/cart/interfaces/view-order.interface';
import { StorageService } from '../../../../core/providers/storage/storage.service';
import { StorageKeys } from '../../../../core/providers/storage/storage.enum';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent, ButtonComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  private cart = inject(CartFacade);
  private storage = inject(StorageService);

  viewOrders = signal<ViewOrder[]>([]);
  phone = model(this.storage.get(StorageKeys.phoneContact) || '');
  showFeatureToggleContact = true;

  listOrders() {
    this.cart
      .listOrders(this.phone().replaceAll(/[^0-9]/g, ''))
      .subscribe((viewOrder) => {
        this.viewOrders.set(viewOrder);
        this.showFeatureToggleContact = false;
      });
  }
}
