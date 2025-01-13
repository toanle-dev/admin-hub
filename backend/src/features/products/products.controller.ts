import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Get('download/:productId')
  async downloadImage(
    @Param('productId') productId: number,
    @Res() res: Response,
  ) {
    try {
      const imageBuffer = await this.productsService.downloadImage(productId);

      // Define os headers apropriados
      res.set({
        // Altere conforme o formato esperado
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="product-image.jpg"`, // Nome sugerido para o arquivo
      });

      // Envia os dados da imagem como resposta
      res.send(imageBuffer);
    } catch (error) {
      console.error('Error downloading image:', error);

      throw new HttpException(
        'Could not download the image.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
