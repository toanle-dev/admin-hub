import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonSize, ButtonTheme } from './button.interface';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  theme = input<ButtonTheme>('primary');
  outline = input(false);
  circle = input(false);
  disabled = input(false);
  class = input('');
  size = input<ButtonSize>('Normal');
}
