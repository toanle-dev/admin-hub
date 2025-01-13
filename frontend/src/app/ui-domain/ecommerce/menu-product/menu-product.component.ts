import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '../../../facade/product/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { CartFacade } from '../../../facade/cart/cart.facade';
import { ProductFacade } from '../../../facade/product/product.facade';
import { ImageDownloaderPipe } from '../../../core/pipes/image-downloader.pipe';

@Component({
  selector: 'app-menu-product',
  standalone: true,
  imports: [CommonModule, ImageDownloaderPipe],
  templateUrl: './menu-product.component.html',
  styleUrl: './menu-product.component.scss',
})
export class MenuProductComponent {
  private readonly cart = inject(CartFacade);

  product = input.required<Product>();

  addProduct() {
    this.cart.addProduct(this.product(), 1);
  }
}
