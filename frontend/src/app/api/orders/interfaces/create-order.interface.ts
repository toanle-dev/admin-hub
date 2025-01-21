export interface CreateOrder {
  items: OrderItem[];
  paymentId: number;
  paymentValue: number;
  phoneContact: string;
  deliveryAddress: DeliveryAddress;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  number: string;
  country: string;
  complement?: string; // Campo opcional
}
