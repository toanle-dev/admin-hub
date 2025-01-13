import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderMenuComponent } from '../../../ui-domain/ecommerce/header-menu/header-menu.component';

@Component({
  selector: 'app-ecommerce-container',
  standalone: true,
  imports: [RouterOutlet, HeaderMenuComponent],
  templateUrl: './ecommerce-container.component.html',
  styleUrl: './ecommerce-container.component.scss',
})
export class EcommerceContainerComponent {}
