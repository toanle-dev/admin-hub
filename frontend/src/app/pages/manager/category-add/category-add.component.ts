import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../core/ui/input/input.component';
import { ButtonComponent } from '../../../core/ui/button/button.component';
import { ProductFacade } from '../../../facade/product/product.facade';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [FormsModule, InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss',
})
export class CategoryAddComponent {
  private readonly productFacade = inject(ProductFacade);
  private readonly fb = inject(FormBuilder);

  categoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  submitForm() {
    if (this.categoryForm.valid) {
      this.productFacade
        .createCategory({
          name: this.categoryForm.value.name || '',
        })
        .subscribe(() => {
          history.back();
        });
    }
  }
}
