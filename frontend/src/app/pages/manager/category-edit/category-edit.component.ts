import { AfterViewInit, Component, inject, input } from '@angular/core';
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
  selector: 'app-category-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
})
export class CategoryEditComponent implements AfterViewInit {
  private readonly productFacade = inject(ProductFacade);
  private readonly fb = inject(FormBuilder);

  id = input.required<number>();

  categoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  ngAfterViewInit(): void {
    this.loadCategory();
  }

  submitForm() {
    if (this.categoryForm.valid) {
      this.productFacade
        .updateCategory(this.id(), {
          name: this.categoryForm.value.name || '',
        })
        .subscribe({
          next: () => history.back(),
          error: (err) => {
            console.log('Erro ao atualizar categoria', err);
          },
        });
    }
  }

  private loadCategory() {
    this.productFacade.findCategory(this.id()).subscribe({
      next: (category) => {
        this.categoryForm.reset({
          name: category.name,
        });
      },
      error: (err) => {
        console.log('Erro ao carregar categoria', err);
      },
    });
  }
}
