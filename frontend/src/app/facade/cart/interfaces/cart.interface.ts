import { Product } from '../../product/interfaces/product.interface';
import { Payment } from './payment.interface';

export interface Order {
  id?: number;
  uuid: string;
  items: OrderItem[];
  statusId: number | null;
  payment: Partial<Payment> | null;
  change: number;
  deliveryAddress: DeliveryAddress | null;
  phoneContact: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id?: number;
  uuid: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface DeliveryAddress {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
  complement: string;
}
