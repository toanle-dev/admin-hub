export interface CreateOrder {
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  quantity: number;
}
