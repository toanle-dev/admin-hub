import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Sse,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';
import { Public } from 'src/modules/auth/decorator/public.decorator';
import { Roles } from 'src/modules/auth/decorator/roles.decorator';
import { Role } from 'src/modules/auth/enum/role.enum';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { JwtToken } from 'src/modules/auth/interfaces/jwt';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './enum/order.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly authService: AuthService,
    private readonly ordersService: OrdersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async createOrder(@Body() orderDto: CreateOrderDto, @Req() req: any) {
    return this.ordersService.createOrder(Number(req.user.userId), orderDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('contact/:phone')
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async getOrdersByContact(@Param('phone') phone) {
    return this.ordersService.getOrdersByContact(phone);
  }

  @Patch(':orderId/status')
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async updateStatus(
    @Param('orderId') orderId: number,
    @Body() data: { statusId: OrderStatus },
  ) {
    return this.ordersService.updateOrderStatus(orderId, data.statusId);
  }

  @Get('payments')
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async getPayments() {
    return this.ordersService.getPayments();
  }

  @Public()
  @Sse('updates')
  sse(@Query('token') token): Observable<MessageEvent> {
    const user = this.authService.verifyToken(token);
    if (!user) throw new UnauthorizedException();

    const hasRole =
      [Role.ADMIN, Role.MANAGER, Role.CUSTOMER].indexOf(user.role.id) > -1;
    if (!hasRole) throw new UnauthorizedException();

    return this.ordersService.getOrdersEvent();
  }

  @Public()
  @Sse('update-order-status')
  sseUpdateCustomerOrder(@Query('token') token): Observable<MessageEvent> {
    const user = this.authService.verifyToken<JwtToken>(token);
    if (!user) throw new UnauthorizedException();

    const hasRole =
      [Role.ADMIN, Role.MANAGER, Role.CUSTOMER].indexOf(user.role.id) > -1;
    if (!hasRole) throw new UnauthorizedException();

    return this.ordersService.getOrdersEventByUser(user.userId);
  }
}
