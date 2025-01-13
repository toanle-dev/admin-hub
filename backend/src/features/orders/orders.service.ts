import { Injectable } from '@nestjs/common';

import { OrderItemInput } from './dto/order-item.input';
import { PrismaProvider } from 'src/common/providers/prisma/prisma.provider';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaProvider) {}

  // Criação do pedido
  async createOrder(userId: number, orderItems: OrderItemInput[]) {
    let totalAmount = 0;
    const items = [];

    // Verificação de estoque e cálculo do total
    for (const item of orderItems) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || product.stock < item.quantity) {
        throw new Error('Produto fora de estoque');
      }

      // Reduzir o estoque
      await this.prisma.product.update({
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

    // Criar pedido no banco de dados
    const order = await this.prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        totalAmount,

        status: { connect: { id: 1 } }, // Status "PENDING"
        items: { create: items },
      },
      include: { items: true },
    });

    return order;
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
    return order;
  }

  async getPayments() {
    return this.prisma.paymentMethod.findMany();
  }
}
