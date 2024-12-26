import { Component } from '@angular/core';
import { CategoryNavBarComponent } from '../../../ui-domain/ecommerce/category-nav-bar/category-nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryNavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
