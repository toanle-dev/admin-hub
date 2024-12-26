import { Component, viewChild } from '@angular/core';
import { DrawerMenuComponent } from '../drawer-menu/drawer-menu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DrawerMenuComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  drawer = viewChild.required<DrawerMenuComponent>('drawer');

  toggleMenu() {
    this.drawer().toggle();
  }
}
