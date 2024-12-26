import { Directive } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appValueAccessor]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ValueAccessorDirective,
    },
  ],
})
export class ValueAccessorDirective<T = any> implements ControlValueAccessor {
  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: T): void {}
}
