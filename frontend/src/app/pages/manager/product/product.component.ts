import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductFacade } from '../../../facade/product/product.facade';

interface ProductView {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private readonly productsFacade = inject(ProductFacade);
  private readonly router = inject(Router);

  products: ProductView[] = [];

  filters = {
    name: '',
    price: '',
    category: '',
  };

  ngOnInit(): void {
    this.loadProducts();
  }

  addProduct(): void {
    this.router.navigate(['product-add']);
  }

  editProduct(productId: number): void {
    this.router.navigate(['product-edit', productId]);
  }

  deleteProduct(productId: number): void {
    this.productsFacade.deleteProduct(productId).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        alert('Erro ao deletar produto');
        console.log('Erro ao deletar produto', err);
      },
    });
  }

  private loadProducts() {
    const mapProducts = (data: any[]) => {
      return data.map((value) => {
        const product = {
          id: value.id,
          name: value.name,
          description: value.description,
          price: value.price,
          stock: value.stock,
          category: value.category?.name || '',
        };
        return product;
      });
    };

    this.productsFacade
      .listProducts()
      .subscribe((res) => (this.products = mapProducts(res)));
  }
}
