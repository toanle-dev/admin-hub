import { Component, computed, inject } from '@angular/core';
import { InputSearchComponent } from '../../../core/ui/input-search/input-search.component';
import { CartFacade } from '../../../facade/cart/cart.facade';

import { ButtonComponent } from '../../../core/ui/button/button.component';
import { DrawerService } from '../../../core/ui/drawer/drawer.service';
import { IconComponent } from '../../../core/ui/icon/icon.component';
import { CartDetailComponent } from '../view/cart-detail/cart-detail.component';
import { OrderListComponent } from '../view/order-list/order-list.component';
import { HeaderMenuService } from './header-menu.service';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [IconComponent, InputSearchComponent, ButtonComponent],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
})
export class HeaderMenuComponent {
  private cart = inject(CartFacade);
  private drawer = inject(DrawerService);
  private headerMenuService = inject(HeaderMenuService);

  productAmount = computed(() => {
    return this.cart
      .order()
      .items.reduce((prev, curr) => prev + curr.quantity, 0);
  });

  hasItems = computed(() => {
    return !!this.cart.order().items.length;
  });

  openCart() {
    this.drawer.set(CartDetailComponent).toggle();
  }

  openOrders() {
    this.drawer.set(OrderListComponent).toggle();
  }

  onFilter(event: any) {
    this.headerMenuService.inputFilter.next(event.target.value);
  }
}
