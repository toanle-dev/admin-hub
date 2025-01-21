export interface ViewOrder {
  id: number;
  userId: number;
  phoneContact: string;
  totalAmount: number;
  statusId: number;
  deliveryAddressId: number;
  createdAt: string;
  updatedAt: string;
  items: ViewOrderItem[];
  status: ViewStatus;
  deliveryAddress: ViewDeliveryAddress;
  payments: ViewPayment[];
}

export interface ViewOrderItem {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
  price: number;
  product: ViewProduct;
}

export interface ViewProduct {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ViewStatus {
  id: number;
  name: string;
}

export interface ViewDeliveryAddress {
  id: number;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface ViewPayment {
  id: number;
  amountPaid: number;
  transactionId: string | null;
  orderId: number;
  methodId: number;
  statusId: number;
  createdAt: string;
  updatedAt: string;
  method: ViewPaymentMethod;
  statusPayment: ViewStatus;
}

export interface ViewPaymentMethod {
  id: number;
  name: string;
}
