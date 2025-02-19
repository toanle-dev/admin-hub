import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardOrdersDeliveryComponent } from '../../../ui-domain/checkout/card-orders-delivery/card-orders-delivery.component';
import { TableOrdersConfirmedComponent } from '../../../ui-domain/checkout/table-orders-confirmed/table-orders-confirmed.component';
import { TableOrdersPendentComponent } from '../../../ui-domain/checkout/table-orders-pendent/table-orders-pendent.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableOrdersPendentComponent,
    TableOrdersConfirmedComponent,
    CardOrdersDeliveryComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {}
