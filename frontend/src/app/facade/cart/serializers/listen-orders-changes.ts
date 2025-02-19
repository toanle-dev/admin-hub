import moment from 'moment';
import { ViewOrder } from '../interfaces/view-order.interface';

const formatDate = (value: string) => moment(value).format('DD/MM/yyyy');

export const mapListenOrdersChanges = (json: any[]): ViewOrder[] => {
  return json.map((order) => ({
    id: order.id,
    userId: order.userId,
    phoneContact: order.phoneContact,
    totalAmount: order.totalAmount,
    statusId: order.statusId,
    deliveryAddressId: order.deliveryAddressId,
    createdAt: formatDate(order.createdAt),
    updatedAt: formatDate(order.updatedAt),
    items: order.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      orderId: item.orderId,
      quantity: item.quantity,
      price: item.price,
      product: {
        id: item.product.id,
        categoryId: item.product.categoryId,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        stock: item.product.stock,
        imageUrl: item.product.imageUrl,
        createdAt: formatDate(item.product.createdAt),
        updatedAt: formatDate(item.product.updatedAt),
      },
    })),
    status: {
      id: order.status.id,
      name: order.status.name,
    },
    deliveryAddress: {
      id: order.deliveryAddress.id,
      street: order.deliveryAddress.street,
      number: order.deliveryAddress.number,
      complement: order.deliveryAddress.complement,
      city: order.deliveryAddress.city,
      state: order.deliveryAddress.state,
      postalCode: order.deliveryAddress.postalCode,
      country: order.deliveryAddress.country,
      createdAt: formatDate(order.deliveryAddress.createdAt),
      updatedAt: formatDate(order.deliveryAddress.updatedAt),
    },
    payments: order.payments.map((payment: any) => ({
      id: payment.id,
      amountPaid: payment.amountPaid,
      transactionId: payment.transactionId,
      orderId: payment.orderId,
      methodId: payment.methodId,
      statusId: payment.statusId,
      createdAt: formatDate(payment.createdAt),
      updatedAt: formatDate(payment.updatedAt),
      method: {
        id: payment.method.id,
        name: payment.method.name,
      },
      statusPayment: {
        id: payment.statusPayment.id,
        name: payment.statusPayment.name,
      },
    })),
  }));
};
