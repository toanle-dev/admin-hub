// dto/create-order.dto.ts
import { CreateDeliveryAddressDto } from './create-delivery-address.dto';
import { OrderItemDto } from './order-item.dto';

export interface CreateOrderDto {
  items: OrderItemDto[];
  paymentId: number;
  paymentValue: number;
  phoneContact: string;
  deliveryAddress: CreateDeliveryAddressDto;
}
