import { Component, inject, viewChild } from '@angular/core';
import { DrawerMenuComponent } from '../drawer-menu/drawer-menu.component';
import { StorageService } from '../../../core/providers/storage/storage.service';
import { StorageKeys } from '../../../core/providers/storage/storage.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DrawerMenuComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private storage = inject(StorageService);
  private router = inject(Router);
  drawer = viewChild.required<DrawerMenuComponent>('drawer');

  toggleMenu() {
    this.drawer().toggle();
  }

  logout() {
    this.storage.remove(StorageKeys.token);
    this.router.navigate(['login']);
  }
}
