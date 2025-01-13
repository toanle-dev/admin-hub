import {
  AfterViewInit,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { MenuProductComponent } from '../../../ui-domain/ecommerce/menu-product/menu-product.component';
import { ProductFacade } from '../../../facade/product/product.facade';
import { Product } from '../../../facade/product/interfaces/product.interface';
import { PaymentDrawerComponent } from '../../../ui-domain/ecommerce/payment-drawer/payment-drawer.component';
import { ButtonComponent } from '../../../core/ui/button/button.component';
import { DrawerComponent } from '../../../core/ui/drawer/drawer.component';
import { CartDrawerComponent } from '../../../ui-domain/ecommerce/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent,
    MenuProductComponent,
    PaymentDrawerComponent,
    ButtonComponent,
    DrawerComponent,
    CartDrawerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  private readonly products = inject(ProductFacade);

  listProducts = signal<Product[]>([]);

  ngAfterViewInit(): void {
    this.products.listProducts().subscribe((data) => {
      this.listProducts.set(data);
    });
  }
}
