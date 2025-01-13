import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemInput } from './dto/order-item.input';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { AdminGuard } from 'src/modules/auth/guard/admin.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Criar um pedido
  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Param('userId') userId: number,
  ) {
    return this.ordersService.createOrder(userId, createOrderDto.items);
  }

  // Listar pedidos de um usuário
  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders(@Param('userId') userId: number) {
    return this.ordersService.getOrdersByUserId(userId);
  }

  // Atualizar status de um pedido
  @Patch(':orderId/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateOrderStatus(
    @Param('orderId') orderId: number,
    @Body() status: { statusId: number },
  ) {
    return this.ordersService.updateOrderStatus(orderId, status.statusId);
  }

  @Get('payments')
  @UseGuards(JwtAuthGuard)
  async getPayments() {
    return this.ordersService.getPayments();
  }
}
