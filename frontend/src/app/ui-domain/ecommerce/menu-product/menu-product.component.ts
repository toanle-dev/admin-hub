import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Product } from '../../../facade/product/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { CartFacade } from '../../../facade/cart/cart.facade';
import { ProductFacade } from '../../../facade/product/product.facade';
import { ImageDownloaderPipe } from '../../../core/pipes/image-downloader.pipe';
import { ButtonComponent } from '../../../core/ui/button/button.component';

@Component({
  selector: 'app-menu-product',
  standalone: true,
  imports: [CommonModule, ImageDownloaderPipe, ButtonComponent],
  templateUrl: './menu-product.component.html',
  styleUrl: './menu-product.component.scss',
})
export class MenuProductComponent {
  private readonly cart = inject(CartFacade);

  product = input.required<Product>();
  amountInCart = computed(() => {
    const listProduct = this.cart
      .order()
      .items.filter((d) => d.product.id == this.product().id);

    return listProduct.reduce((acc: any, item: any) => {
      return acc + item.quantity;
    }, 0);
  });

  addProduct() {
    this.cart.addProduct(this.product(), 1);
  }
}
