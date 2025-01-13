import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from 'src/common/common.module';
import { CloudinaryModule } from 'src/common/providers/cloudinary/cloudinary.module';

@Module({
  imports: [
    CommonModule,
    CloudinaryModule,
    MulterModule.register({
      // Diretório temporário para salvar arquivos
      dest: './uploads',
    }),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
