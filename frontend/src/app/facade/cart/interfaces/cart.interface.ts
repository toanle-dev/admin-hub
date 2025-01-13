import { Product } from '../../product/interfaces/product.interface';

export interface Order {
  id?: number;
  uuid: string;
  items: OrderItem[];
  totalAmount: number;
  statusId: number | null;
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
