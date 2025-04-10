import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductFacade } from '../../../facade/product/product.facade';
import { Router } from '@angular/router';
import { Category } from '../../../facade/product/interfaces/category.interface';
import { ButtonComponent } from '../../../core/ui/button/button.component';
import { InputComponent } from '../../../core/ui/input/input.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements AfterViewInit {
  private readonly productFacade = inject(ProductFacade);
  private readonly router = inject(Router);

  categories: Category[] = [];
  categoriesFiltered: Category[] = [];

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  addCategory() {
    this.router.navigate(['category-add']);
  }

  editCategory(id: number) {
    this.router.navigate(['category-edit', id]);
  }

  onFilterCategories(event: any) {
    const text = event.target.value;
    if (!text) {
      this.categoriesFiltered = this.categories;
    } else {
      this.categoriesFiltered = this.categories.filter((d) =>
        d.name.toUpperCase().includes(String(text).toUpperCase()),
      );
    }
  }

  private loadCategories() {
    this.productFacade.listCategories().subscribe((data) => {
      this.categories = data;
      this.categoriesFiltered = this.categories;
    });
  }
}
