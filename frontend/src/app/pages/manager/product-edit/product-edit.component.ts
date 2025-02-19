import { CommonModule } from '@angular/common';
import { Component, inject, input, signal, viewChild } from '@angular/core';
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
import { InputFileComponent } from '../../../core/ui/input-file/input-file.component';
import { GoBackComponent } from '../../../core/ui/go-back/go-back.component';

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
    InputFileComponent,
    GoBackComponent,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent {
  private readonly productFacade = inject(ProductFacade);
  private readonly fb = inject(FormBuilder);
  file = viewChild<InputFileComponent>('file');

  id = input.required<number>();
  categories = signal<SelectOption[]>([]);
  deleteImage = signal(false);
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: [''],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    category: ['', Validators.required],
  });

  ngAfterViewInit(): void {
    this.loadData();
  }

  submitForm(): void {
    const product = this.mapUpdateProduct();

    this.productFacade.updateProduct(this.id(), product).subscribe({
      next: () => {
        history.back();
      },
      error: (err) => {
        alert('Erro ao atualizar produto');
        console.log(err);
      },
    });
  }

  removeImage() {
    this.deleteImage.set(true);
    this.productForm.get('imageUrl')?.setValue('');
  }

  goBack() {
    history.back();
  }

  private loadData() {
    // Carrega as categorias
    this.productFacade.listCategories().subscribe((categories) => {
      const data = categories.map((c) => {
        return {
          value: String(c.id),
          label: c.name,
        };
      });

      this.categories.set(data);

      // Carrega o produto
      this.productFacade
        .findProduct(this.id())
        .subscribe((product: Product) => {
          this.productForm.reset({
            name: product.name,
            description: product.description,
            price: Number(product.price),
            stock: product.stock,
            imageUrl: product.imageUrl,
            category: String(product.categoryId),
          });
        });
    });
  }

  private mapUpdateProduct(): FormData {
    const data = this.productForm.value;
    const product: CreateProduct = {
      name: data.name || '',
      description: data.description || '',
      price: Number(data.price),
      stock: Number(data.stock),
      imageUrl: data.imageUrl || '',
      categoryId: Number(data.category),
    };

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', String(product.price));
    formData.append('description', product.description);
    formData.append('stock', String(product.stock));
    formData.append('imageUrl', String(product.imageUrl));
    formData.append('categoryId', String(product.categoryId));
    if (this.file()) {
      formData.append('image', this.file()?.selectedFile || '');
    }

    return formData;
  }
}
