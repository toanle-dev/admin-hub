import { AfterViewInit, Component, inject, signal } from '@angular/core';

import { MenuProductComponent } from '../../../ui-domain/ecommerce/menu-product/menu-product.component';
import { ProductFacade } from '../../../facade/product/product.facade';
import {
  GroupedProducts,
  Product,
} from '../../../facade/product/interfaces/product.interface';

import { DrawerService } from '../../../core/ui/drawer/drawer.service';
import { HeaderMenuService } from '../../../ui-domain/ecommerce/header-menu/header-menu.service';
import { GroupedObservable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  private products = inject(ProductFacade);
  private headerMenuService = inject(HeaderMenuService);
  private listProducts: GroupedProducts = {};

  filteredListProducts = signal<GroupedProducts>({});
  categories = signal<string[]>([]);

  ngAfterViewInit(): void {
    this.products.listGroupedProducts().subscribe((data) => {
      this.listProducts = data;

      this.categories.set(Object.keys(data));

      this.filteredListProducts.set(data);
    });

    this.headerMenuService.inputFilter.subscribe((value: string) => {
      if (!value) {
        this.filteredListProducts.set(this.listProducts);
      }

      this.filteredListProducts.update((data) => {
        const groupedProducts = structuredClone(data);
        Object.keys(groupedProducts).forEach((g) => {
          groupedProducts[g] = this.listProducts[g].filter((product) => {
            return product.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
          });
        });

        return { ...groupedProducts };
      });
    });
  }

  listByCategory(category: string): Product[] {
    return this.filteredListProducts()[category];
  }
}
