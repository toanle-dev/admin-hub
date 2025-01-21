import { PaymentMethod } from '../enums/payment.enum';
import { Payment } from '../interfaces/payment.interface';

export const mapPayments = (res: any[]): Payment[] => {
  return res.map((value) => {
    const data: Payment = {
      id: value.id,
      name: value.name,
      value: 0,
      description: PaymentMethod[value.name as keyof typeof PaymentMethod],
    };
    return data;
  });
};
