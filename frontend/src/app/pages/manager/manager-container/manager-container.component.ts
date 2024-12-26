import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../../ui-domain/manager/nav-bar/nav-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './manager-container.component.html',
  styleUrl: './manager-container.component.scss',
})
export class ManagerContainerComponent {}
