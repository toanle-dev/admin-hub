import { Component, input } from '@angular/core';
import { OrderItem } from '../../../facade/cart/interfaces/cart.interface';
import { ImageDownloaderPipe } from '../../../core/pipes/image-downloader.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-product-view',
  standalone: true,
  imports: [CommonModule, ImageDownloaderPipe],
  templateUrl: './cart-product-view.component.html',
  styleUrl: './cart-product-view.component.scss',
})
export class CartProductViewComponent {
  item = input.required<OrderItem>();
}
