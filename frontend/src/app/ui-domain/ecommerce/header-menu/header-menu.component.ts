import { Component, computed, inject, viewChild } from '@angular/core';
import { InputSearchComponent } from '../../../core/ui/input-search/input-search.component';
import { CartFacade } from '../../../facade/cart/cart.facade';
import { CartDrawerComponent } from '../cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [InputSearchComponent, CartDrawerComponent],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
})
export class HeaderMenuComponent {
  private readonly cart = inject(CartFacade);

  drawer = viewChild.required<CartDrawerComponent>('drawer');

  productAmount = computed(() => {
    return this.cart
      .order()
      .items.reduce((prev, curr) => prev + curr.quantity, 0);
  });
}
