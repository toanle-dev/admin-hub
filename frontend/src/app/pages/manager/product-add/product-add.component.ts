import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
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
import { InputFileComponent } from '../../../core/ui/input-file/input-file.component';
import { GoBackComponent } from '../../../core/ui/go-back/go-back.component';

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
    InputFileComponent,
    GoBackComponent,
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent implements AfterViewInit {
  private readonly productFacade = inject(ProductFacade);
  private readonly fb = inject(FormBuilder);

  file = viewChild.required(InputFileComponent);
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
    const data = this.mapCreateProduct(this.productForm.value);

    this.productFacade.createProduct(data).subscribe({
      next: (res) => {
        history.back();
      },
      error: (err) => {
        console.log('Erro ao cadastrar produto', err);
      },
    });
  }

  goBack() {
    history.back();
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

  private mapCreateProduct(data: any): FormData {
    const product: CreateProduct = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      imageUrl: data.imageUrl,
      categoryId: Number(data.category),
    };

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', String(product.price));
    formData.append('description', product.description);
    formData.append('stock', String(product.stock));
    formData.append('imageUrl', String(product.imageUrl));
    formData.append('categoryId', String(product.categoryId));
    formData.append('image', this.file().selectedFile || '');

    return formData;
  }
}
