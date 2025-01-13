import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { CartFacade } from '../../../facade/cart/cart.facade';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { ButtonComponent } from '../../../core/ui/button/button.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CartProductComponent, ButtonComponent],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
})
export class CartDrawerComponent {
  private readonly cart = inject(CartFacade);

  readonly id = uuidv4();
  input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  items = computed(() => this.cart.order().items);

  toggle() {
    this.input().nativeElement.checked = !this.input().nativeElement.checked;
  }
}
