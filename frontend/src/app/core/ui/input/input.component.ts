import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  forwardRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, NgxCurrencyDirective, FormsModule, NgxMaskDirective],
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
  placeholder = input('');
  type = input('text');
  currency = input(false);
  phone = input(false);
  changeValue = output<KeyboardEvent>();
  input = viewChild.required<ElementRef>('input');

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onKeyUp(event: KeyboardEvent) {
    this.changeValue.emit(event);
  }

  onInput(event: Event | number) {
    if (event instanceof Event) {
      const input = event.target as HTMLInputElement;
      this.writeValue(input.value); // Atualiza o valor
    } else {
      this.writeValue(String(event)); // Atualiza o valor para ngx-currency
    }
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value || '';
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
