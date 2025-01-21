export interface Order {
  id: number;
  totalValue: number;
  deliveryAddressId: number | null;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  items: OrderItem[];
  status: OrderStatus;
  deliveryAddress: DeliveryAddress | null;
  payments: Payment[];
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderStatus {
  id: number;
  name: string;
}

export interface DeliveryAddress {
  id: number;
  street: string;
  number: string;
  complement?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}

export interface Payment {
  id: number;
  amountPaid: number;
  transactionId?: string | null;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  method: PaymentMethod;
  statusPayment: PaymentStatus;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface PaymentStatus {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  categoryId: number | null;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
