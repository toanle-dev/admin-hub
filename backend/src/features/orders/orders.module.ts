import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
