import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../core/ui/button/button.component';
import { SelectComponent } from '../../../core/ui/select/select.component';
import { InputComponent } from '../../../core/ui/input/input.component';
import { CartFacade } from '../../../facade/cart/cart.facade';
import { SelectOption } from '../../../core/ui/select/select.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../../core/ui/textarea/textarea.component';
import { DeliveryAddressFormComponent } from '../delivery-address-form/delivery-address-form.component';

@Component({
  selector: 'app-payment-drawer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    SelectComponent,
    InputComponent,
    DeliveryAddressFormComponent,
  ],
  templateUrl: './payment-drawer.component.html',
  styleUrl: './payment-drawer.component.scss',
})
export class PaymentDrawerComponent implements OnInit {
  private cart = inject(CartFacade);
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

  input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  payments = signal<SelectOption[]>([]);

  ngOnInit(): void {
    this.loadPayments();
  }

  onSubmitAddress() {
    const address = this.deliveryAddressForm.value;
    // this.cart.setDeliveryAddress(address);
  }

  onChangeAddress(data: any) {
    console.log(data);
  }

  toggle() {
    this.input().nativeElement.checked = !this.input().nativeElement.checked;
  }

  private loadPayments() {
    this.cart.getPayments().subscribe((data) => {
      const payments = data.map((p) => {
        return <SelectOption>{
          label: p.description,
          value: String(p.id),
        };
      });
      this.payments.set(payments);
    });
  }
}
