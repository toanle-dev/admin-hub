import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { StorageKeys } from '../../../core/providers/storage/storage.enum';
import { StorageService } from '../../../core/providers/storage/storage.service';
import { IconComponent } from '../../../core/ui/icon/icon.component';

@Component({
  selector: 'app-drawer-menu',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './drawer-menu.component.html',
  styleUrl: './drawer-menu.component.scss',
})
export class DrawerMenuComponent {
  private router = inject(Router);
  private storage = inject(StorageService);

  readonly id = uuidv4();
  input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  toggle() {
    this.input().nativeElement.checked = !this.input().nativeElement.checked;
  }

  gotToRoute(route: string) {
    this.router.navigate([route]);
    this.toggle();
  }

  logout() {
    this.storage.remove(StorageKeys.token);
    this.router.navigate(['login']);
  }
}
