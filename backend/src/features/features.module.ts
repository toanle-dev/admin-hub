import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    UsersModule,
  ],
  providers: [],
  controllers: [],
})
export class FeaturesModule {}
