import { Component, input, output } from '@angular/core';
import { ButtonTheme } from './button.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  theme = input<ButtonTheme>('default');
  outline = input(false);
  circle = input(false);
  disabled = input(false);
  class = input('');
}
