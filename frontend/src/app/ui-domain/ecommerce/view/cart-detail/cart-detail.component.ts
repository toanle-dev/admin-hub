import { Component, computed, inject } from '@angular/core';
import { CartProductComponent } from '../../cart-product/cart-product.component';
import { ButtonComponent } from '../../../../core/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { CartFacade } from '../../../../facade/cart/cart.facade';
import { DrawerService } from '../../../../core/ui/drawer/drawer.service';
import { OrderConfirmComponent } from '../order-confirm/order-confirm.component';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule, CartProductComponent, ButtonComponent],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss',
})
export class CartDetailComponent {
  private cart = inject(CartFacade);
  private drawer = inject(DrawerService);

  items = computed(() => this.cart.order().items);
  totalValue = computed(() =>
    this.cart.order().items.reduce((acc: any, item: any) => {
      return acc + item.price * item.quantity;
    }, 0)
  );

  openPayment() {
    this.drawer.set(OrderConfirmComponent);
  }
}
