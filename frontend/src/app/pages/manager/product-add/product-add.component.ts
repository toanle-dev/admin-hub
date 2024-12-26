import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonComponent } from '../../../core/ui/button/button.component';
import { TextareaComponent } from '../../../core/ui/textarea/textarea.component';
import { SelectComponent } from '../../../core/ui/select/select.component';
import { InputComponent } from '../../../core/ui/input/input.component';
import { CreateProduct } from '../../../api/products/interfaces/create-product.interface';
import { ProductFacade } from '../../../facade/product/product.facade';
import { SelectOption } from '../../../core/ui/select/select.interface';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    TextareaComponent,
    SelectComponent,
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent implements AfterViewInit {
  private readonly productFacade = inject(ProductFacade);
  private readonly fb = inject(FormBuilder);

  categories = signal<SelectOption[]>([]);

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    category: ['', Validators.required],
  });

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  submitForm(): void {
    const product = this.mapCreateProduct(this.productForm.value);
    this.productFacade.createProduct(product).subscribe({
      next: (res) => {
        history.back();
      },
      error: (err) => {
        console.log('Erro ao cadastrar produto', err);
      },
    });
  }

  private loadCategories() {
    this.productFacade.listCategories().subscribe((categories) => {
      const data = categories.map((c) => {
        return {
          value: String(c.id),
          label: c.name,
        };
      });

      this.categories.set(data);
    });
  }

  private mapCreateProduct(data: any): CreateProduct {
    const product: CreateProduct = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      imageUrl: data.imageUrl,
      categoryId: Number(data.category),
    };

    return product;
  }
}
