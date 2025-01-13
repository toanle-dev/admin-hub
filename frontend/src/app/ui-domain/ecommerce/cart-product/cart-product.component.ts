import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CounterComponent } from '../../../core/ui/counter/counter.component';

import { CommonModule } from '@angular/common';
import { OrderItem } from '../../../facade/cart/interfaces/cart.interface';
import { ProductFacade } from '../../../facade/product/product.facade';
import { CartFacade } from '../../../facade/cart/cart.facade';
import { ImageDownloaderPipe } from '../../../core/pipes/image-downloader.pipe';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CounterComponent, CommonModule, ImageDownloaderPipe],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss',
})
export class CartProductComponent {
  private cart = inject(CartFacade);

  item = input.required<OrderItem>();

  changeQuantity(quantity: number) {
    this.cart.changeQuantity(this.item().uuid, quantity);
  }
}
