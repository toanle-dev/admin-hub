import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../core/ui/input/input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../../core/ui/textarea/textarea.component';
import { ButtonComponent } from '../../../core/ui/button/button.component';

@Component({
  selector: 'app-delivery-address-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
  ],
  templateUrl: './delivery-address-form.component.html',
  styleUrl: './delivery-address-form.component.scss',
})
export class DeliveryAddressFormComponent {
  private fb = inject(FormBuilder);

  deliveryAddressForm = this.fb.group({
    street: ['', Validators.required],
    number: ['', Validators.required],
    complement: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['', Validators.required],
  });

  onSubmit() {}
}
