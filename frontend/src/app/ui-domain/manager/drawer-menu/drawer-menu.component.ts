import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-drawer-menu',
  standalone: true,
  imports: [],
  templateUrl: './drawer-menu.component.html',
  styleUrl: './drawer-menu.component.scss',
})
export class DrawerMenuComponent {
  private readonly router = inject(Router);

  readonly id = uuidv4();
  input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  toggle() {
    this.input().nativeElement.checked = !this.input().nativeElement.checked;
  }

  gotToRoute(route: string) {
    this.router.navigate([route]);
    this.toggle();
  }
}
