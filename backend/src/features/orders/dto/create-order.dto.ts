// dto/create-order.dto.ts
import { OrderItemInput } from './order-item.input';

export interface CreateOrderDto {
  items: OrderItemInput[];
}
