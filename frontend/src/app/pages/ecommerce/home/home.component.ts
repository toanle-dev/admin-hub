import { AfterViewInit, Component, inject, signal } from '@angular/core';

import {
  GroupedProducts,
  Product,
} from '../../../facade/product/interfaces/product.interface';
import { ProductFacade } from '../../../facade/product/product.facade';
import { MenuProductComponent } from '../../../ui-domain/ecommerce/menu-product/menu-product.component';

import { ToastService } from '../../../core/ui/toast/toast.service';
import { CartFacade } from '../../../facade/cart/cart.facade';
import { HeaderMenuService } from '../../../ui-domain/ecommerce/header-menu/header-menu.service';

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
  private cart = inject(CartFacade);
  private toast = inject(ToastService);

  private listProducts: GroupedProducts = {};

  filteredListProducts = signal<GroupedProducts>({});
  categories = signal<string[]>([]);

  ngAfterViewInit(): void {
    this.loadData();
  }

  listByCategory(category: string): Product[] {
    return this.filteredListProducts()[category];
  }

  private loadData() {
    // Load products
    this.products.listGroupedProducts().subscribe((data) => {
      this.listProducts = data;

      this.categories.set(Object.keys(data));

      this.filteredListProducts.set(data);
    });

    // Apply filter
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

    // Listen changes status order
    this.cart.listenOrdersChanges().subscribe(() => {
      this.toast.add('Status do pedido atualizado!', 'success');
    });
  }
}
