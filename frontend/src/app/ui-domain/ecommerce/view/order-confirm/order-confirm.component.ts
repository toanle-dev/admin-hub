import { Component, computed, inject, model, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../core/ui/button/button.component';
import { InputComponent } from '../../../../core/ui/input/input.component';
import { SelectComponent } from '../../../../core/ui/select/select.component';
import { SelectOption } from '../../../../core/ui/select/select.interface';
import { CartFacade } from '../../../../facade/cart/cart.facade';
import { DrawerService } from '../../../../core/ui/drawer/drawer.service';
import { AddressRegisterComponent } from '../address-register/address-register.component';
import { CheckboxComponent } from '../../../../core/ui/checkbox/checkbox.component';
import {
  PaymentMethod,
  PaymentMethodIndex,
} from '../../../../facade/cart/enums/payment.enum';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../core/ui/toast/toast.service';
import { StorageService } from '../../../../core/providers/storage/storage.service';
import { StorageKeys } from '../../../../core/providers/storage/storage.enum';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    FormsModule,
  ],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss',
})
export class OrderConfirmComponent {
  private cart = inject(CartFacade);
  private fb = inject(FormBuilder);
  private drawer = inject(DrawerService);
  private toast = inject(ToastService);
  private storage = inject(StorageService);

  deliveryAddressForm = this.fb.group({
    street: ['', Validators.required],
    number: ['', Validators.required],
    complement: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['', Validators.required],
  });

  paymentsMethod = signal<SelectOption[]>([]);
  paymentId = '';
  paymentValue = 0;
  changeValue = 0;
  phoneContact = this.storage.get(StorageKeys.phoneContact) || '';
  totalValue = computed(() => {
    return this.cart.order().items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  });
  deliveryAddress = computed(() => this.cart.order().deliveryAddress);
  isCashPayment = computed(() => {
    const paymentId = Number(this.cart.order().payment?.id);
    return paymentId == PaymentMethodIndex.DINHEIRO;
  });

  ngOnInit(): void {
    this.loadData();
  }

  addAddress() {
    this.drawer.set(AddressRegisterComponent);
  }

  onChangeAddress(data: any) {
    console.log('Address', data);
  }

  changePayment(event: any) {
    this.cart.setPayment(event);
  }

  changeContact(event: KeyboardEvent) {
    this.cart.setPhoneContact(this.phoneContact);
  }

  backNavigation() {
    this.drawer.command.goBack();
  }

  confirmOrder() {
    this.cart.confirmOrder().subscribe({
      next: () => {
        this.toast.add('Pedido enviado', 'success');
        this.drawer.command.toggle();
      },
      error: (err) => {
        console.log('erro', err);
      },
    });
  }

  private loadData() {
    this.cart.getPayments().subscribe((data) => {
      const payments = data.map((p) => {
        return <SelectOption>{
          label: p.description,
          value: String(p.id),
        };
      });
      this.paymentsMethod.set(payments);
      console.log(this.cart.order().payment?.id);
      this.paymentId = String(this.cart.order().payment?.id);
    });

    this.paymentValue = this.totalValue();
  }
}
