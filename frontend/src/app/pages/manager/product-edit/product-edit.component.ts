import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../core/ui/input/input.component';
import { ButtonComponent } from '../../../core/ui/button/button.component';
import { TextareaComponent } from '../../../core/ui/textarea/textarea.component';
import { SelectComponent } from '../../../core/ui/select/select.component';
import { CreateProduct } from '../../../api/products/interfaces/create-product.interface';
import { SelectOption } from '../../../core/ui/select/select.interface';
import { ProductFacade } from '../../../facade/product/product.facade';
import { Product } from '../../../facade/product/interfaces/product.interface';
import { ImageDownloaderPipe } from '../../../core/pipes/image-downloader.pipe';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    TextareaComponent,
    SelectComponent,
    ImageDownloaderPipe,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent {
  private readonly productFacade = inject(ProductFacade);
  private readonly fb = inject(FormBuilder);

  id = input.required<number>();
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
    this.loadProduct();
  }

  submitForm(): void {
    const product = this.mapCreateProduct(this.productForm.value);
    this.productFacade.updateProduct(this.id(), product).subscribe({
      next: () => {
        history.back();
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  private loadProduct() {
    this.productFacade.findProduct(this.id()).subscribe((product: Product) => {
      this.productForm.reset({
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: product.stock,
        category: String(product.categoryId),
      });
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
