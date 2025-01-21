import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderMenuComponent } from '../../../ui-domain/ecommerce/header-menu/header-menu.component';
import { DrawerService } from '../../../core/ui/drawer/drawer.service';
import { DrawerComponent } from '../../../core/ui/drawer/drawer.component';
import { ToastComponent } from '../../../core/ui/toast/toast.component';
import { ToastService } from '../../../core/ui/toast/toast.service';

@Component({
  selector: 'app-ecommerce-container',
  standalone: true,
  imports: [RouterOutlet, HeaderMenuComponent, DrawerComponent, ToastComponent],
  templateUrl: './ecommerce-container.component.html',
  styleUrl: './ecommerce-container.component.scss',
})
export class EcommerceContainerComponent implements AfterViewInit {
  drawerService = inject(DrawerService);
  toastService = inject(ToastService);

  drawer = viewChild.required<DrawerComponent>('drawer');
  toast = viewChild.required<ToastComponent>('toast');

  ngAfterViewInit(): void {
    this.drawerService.create(this.drawer());
    this.toastService.create(this.toast());
  }
}
