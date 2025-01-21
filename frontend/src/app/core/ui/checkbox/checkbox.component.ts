import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input('');

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};
  private _value: boolean = false;

  get value(): boolean {
    return this._value;
  }

  set value(val: boolean) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this._value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  toggle(): void {
    this.value = !this.value;
  }
}
