import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, NgxCurrencyDirective, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  value: string = '';
  label = input('');
  type = input('text');
  currency = input(false);

  input = viewChild.required<ElementRef>('input');

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInput(event: Event | number) {
    // Caso for um input normal
    if (event instanceof Event) {
      const input = event.target as HTMLInputElement;
      this.value = input.value;
    } else {
      // Caso usar ngx-currency o valor do evento vem numerico
      this.value = String(event);
    }

    // Notifica Angular sobre a mudança no valor
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value || '';
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
