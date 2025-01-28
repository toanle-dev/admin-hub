import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductFacade } from '../../../facade/product/product.facade';
import { InputComponent } from '../../../core/ui/input/input.component';
import { ButtonComponent } from '../../../core/ui/button/button.component';

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
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private readonly productsFacade = inject(ProductFacade);
  private readonly router = inject(Router);

  products = signal<ProductView[]>([]);
  filteredProducts = signal<ProductView[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  onFilterProducts(event: any) {
    const value = event.target.value;
    this.filteredProducts.set(this.products());
    if (value) {
      this.filteredProducts.update((products) => {
        return products.filter((p) => {
          return (
            p.category.toLowerCase().includes(value.toLowerCase()) ||
            p.description.toLowerCase().includes(value.toLowerCase()) ||
            p.name.toLowerCase().includes(value.toLowerCase()) ||
            p.price.toString().includes(value)
          );
        });
      });
    }
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

    this.productsFacade.listProducts().subscribe((res) => {
      this.products.set(mapProducts(res));
      this.filteredProducts.set(this.products());
    });
  }
}
