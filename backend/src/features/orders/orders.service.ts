import { Injectable } from '@nestjs/common';

import { PrismaProvider } from 'src/common/providers/prisma/prisma.provider';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { Order, Product } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { map, Observable, Subject } from 'rxjs';
import { PaymentMethod } from './enum/payment.enum';
import { OrderStatus } from './enum/order.enum';

@Injectable()
export class OrdersService {
  private ordersChange = new Subject();

  constructor(private prisma: PrismaProvider) {}

  // Criação do pedido
  async createOrder(userId: number, orderDto: CreateOrderDto): Promise<any> {
    return this.prisma.$transaction(async (prisma) => {
      const orderItems = orderDto.items;
      const deliveryAddressDto = orderDto.deliveryAddress;
      const paymentId = orderDto.paymentId;

      let totalAmount = 0;
      const items = [];

      // Verificar estoque e calcular o total
      for (const item of orderItems) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product || product.stock < item.quantity) {
          throw new Error('Produto fora de estoque');
        }

        // Atualizar o estoque do produto
        await prisma.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity },
        });

        totalAmount += product.price * item.quantity;

        items.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // Criar endereço de entrega
      const deliveryAddress = await prisma.deliveryAddress.create({
        data: {
          street: deliveryAddressDto.street,
          number: deliveryAddressDto.number,
          city: deliveryAddressDto.city,
          state: deliveryAddressDto.state,
          postalCode: deliveryAddressDto.postalCode,
          country: deliveryAddressDto.country,
          complement: deliveryAddressDto.complement || null,
        },
      });

      // Criar o pedido no banco de dados
      const order: Order = await prisma.order.create({
        data: {
          userId: userId,
          totalAmount: totalAmount,
          deliveryAddressId: deliveryAddress.id,
          phoneContact: orderDto.phoneContact,
          statusId: OrderStatus.PENDING,
          items: {
            create: items,
          },
        },
        include: {
          items: true,
          status: true,
          deliveryAddress: true,
        },
      });

      // Criar o registro de pagamento
      const payment = await prisma.payment.create({
        data: {
          amountPaid: totalAmount,
          method: { connect: { id: paymentId } },
          statusPayment: { connect: { id: PaymentMethod.PENDING } },
          order: { connect: { id: order.id } },
        },
      });

      // Notifica atualização das rotas
      const orders = await this.getOrders();
      this.ordersChange.next(orders);

      return {
        order,
        payment,
      };
    });
  }

  async getOrdersByContact(phone: string) {
    return this.prisma.order.findMany({
      where: {
        phoneContact: phone,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        status: true,
        deliveryAddress: true,
        payments: {
          include: {
            method: true,
            statusPayment: true,
          },
        },
      },
    });
  }
  async getOrders() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        status: true,
        deliveryAddress: true,
        payments: {
          include: {
            method: true,
            statusPayment: true,
          },
        },
      },
    });
  }

  // Buscar pedidos por usuário
  async getOrdersByUserId(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true, status: true },
    });
  }

  // Atualizar status do pedido
  async updateOrderStatus(orderId: number, statusId: number) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { statusId },
      include: { status: true },
    });

    const orders = await this.getOrders();
    this.ordersChange.next(orders);
    return order;
  }

  async getPayments() {
    return this.prisma.paymentMethod.findMany();
  }

  getOrdersEvent(): Observable<MessageEvent> {
    return this.ordersChange.asObservable().pipe(
      map(
        (orders) =>
          ({
            data: orders,
          }) as MessageEvent,
      ),
    );
  }
}
