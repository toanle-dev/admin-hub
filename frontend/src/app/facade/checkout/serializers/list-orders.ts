import { Order, OrderItem, Payment } from '../interfaces/order.interface';

import moment from 'moment';

const formatDate = (value: string) => moment(value).format('DD/MM/yyyy');

export const mapOrders = (res: any): Order[] => {
  return res.map((order: any) => {
    const orderData: Order = {
      id: order.id,
      phoneContact: order.phoneContact,
      totalValue: order.items.reduce((acc: any, item: any) => {
        return acc + item.price * item.quantity;
      }, 0),
      deliveryAddressId: order.deliveryAddressId,
      createdAt: formatDate(order.createdAt),
      updatedAt: formatDate(order.updatedAt),
      status: order.status,
      deliveryAddress: order.deliveryAddress,
      items: order.items.map((item: any) => {
        const itemData: OrderItem = {
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          product: {
            id: item.product.id,
            categoryId: item.product.categoryId,
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            stock: item.product.stock,
            imageUrl: item.product.imageUrl,
            createdAt: formatDate(item.product.createdAy),
            updatedAt: formatDate(item.product.updatedAy),
          },
        };
        return itemData;
      }),
      payments: order.payments.map((p: any) => {
        const payment: Payment = {
          id: p.id,
          amountPaid: p.amountPaid,
          transactionId: p.transactionId,
          createdAt: formatDate(p.createdAt),
          updatedAt: formatDate(p.updatedAt),
          method: p.method,
          statusPayment: p.statusPayment,
        };
        return payment;
      }),
    };
    return orderData;
  });
};
