import { PaymentMethod } from '../enums/payment.enum';

export interface Payment {
  id: number;
  name: string;
  description: PaymentMethod;
}
