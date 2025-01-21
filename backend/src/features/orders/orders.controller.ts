import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Req,
  Sse,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';
import { OrderStatus } from './enum/order.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly authService: AuthService,
    private readonly ordersService: OrdersService,
  ) {}

  // Criar um pedido
  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() orderDto: CreateOrderDto, @Req() req: any) {
    return this.ordersService.createOrder(req.user.userId, orderDto);
  }

  // Listar pedidos de um usuário
  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('contact/:phone')
  @UseGuards(JwtAuthGuard)
  async getOrdersByContact(@Param('phone') phone) {
    return this.ordersService.getOrdersByContact(phone);
  }

  // Atualizar status do pedido
  @Patch(':orderId/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('orderId') orderId: number,
    @Body() data: { statusId: OrderStatus },
  ) {
    return this.ordersService.updateOrderStatus(orderId, data.statusId);
  }

  @Get('payments')
  @UseGuards(JwtAuthGuard)
  async getPayments() {
    return this.ordersService.getPayments();
  }

  @Sse('updates')
  sse(@Query('token') token): Observable<MessageEvent> {
    const user = this.authService.verifyToken(token);
    if (!user) throw new UnauthorizedException();

    return this.ordersService.getOrdersEvent();
  }
}
