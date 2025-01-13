import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CommonModule } from 'src/common/common.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { CategoriesService } from './categories/categories.service';
import { UsersController } from './users/users.controller';
import { CategoriesController } from './categories/categories.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CommonModule, ProductsModule],
  providers: [UsersService, OrdersService, CategoriesService],
  controllers: [OrdersController, UsersController, CategoriesController],
})
export class FeaturesModule {}
