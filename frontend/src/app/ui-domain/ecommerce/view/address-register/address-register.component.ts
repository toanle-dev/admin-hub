import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../core/ui/button/button.component';
import { InputComponent } from '../../../../core/ui/input/input.component';
import { v4 as uuidv4 } from 'uuid';
import { TextareaComponent } from '../../../../core/ui/textarea/textarea.component';
import { DrawerService } from '../../../../core/ui/drawer/drawer.service';
import { CepService } from '../../../../core/providers/cep/cep.service';
import { CartFacade } from '../../../../facade/cart/cart.facade';
import { StorageService } from '../../../../core/providers/storage/storage.service';
import { StorageKeys } from '../../../../core/providers/storage/storage.enum';
import { DeliveryAddress } from '../../../../facade/cart/interfaces/cart.interface';

@Component({
  selector: 'app-address-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
  ],
  templateUrl: './address-register.component.html',
  styleUrl: './address-register.component.scss',
})
export class AddressRegisterComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private drawer = inject(DrawerService);
  private cepService = inject(CepService);
  private cart = inject(CartFacade);
  private storage = inject(StorageService);

  readonly id = uuidv4();

  deliveryAddressForm = this.fb.group({
    postalCode: ['', Validators.required],
    district: [''],
    street: ['', Validators.required],
    number: ['', Validators.required],
    complement: [''],
  });

  ngAfterViewInit(): void {
    const address = JSON.parse(
      this.storage.get(StorageKeys.address) || ''
    ) as DeliveryAddress;

    if (address) {
      this.deliveryAddressForm.reset({
        postalCode: address.postalCode,
        district: address.district,
        street: address.street,
        number: address.number,
        complement: address.complement,
      });
    }
  }

  onSubmit() {
    if (this.deliveryAddressForm.valid) {
      this.cart.addAddress({
        street: this.deliveryAddressForm.value.street || '',
        number: this.deliveryAddressForm.value.number || '',
        district: this.deliveryAddressForm.value.district || '',
        city: '',
        state: '',
        postalCode: this.deliveryAddressForm.value.postalCode || '',
        complement: this.deliveryAddressForm.value.complement || '',
      });

      this.drawer.command.goBack();
    }
  }

  goBack() {
    this.drawer.command.goBack();
  }

  onPostalCodeChange(event: any) {
    const cep = event.target.value.replace(/[^0-9]/g, '');
    // Valida se o cep é valido
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (cepRegex.test(cep)) {
      this.cepService.getAddress(cep).subscribe((info) => {
        if (info.cep) {
          this.deliveryAddressForm.reset({
            street: info.logradouro,
            number: '',
            district: info.bairro,
            complement: info.complemento,
            postalCode: info.cep.replaceAll(/[^0-9]/g, ''),
          });
        } else {
          console.log('Error', info);
        }
      });
    }
  }
}
