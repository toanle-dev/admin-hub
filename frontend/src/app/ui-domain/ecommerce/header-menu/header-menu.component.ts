import { Component } from '@angular/core';
import { InputSearchComponent } from '../input-search/input-search.component';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [InputSearchComponent],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
})
export class HeaderMenuComponent {}
