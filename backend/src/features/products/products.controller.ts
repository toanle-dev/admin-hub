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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Roles } from 'src/modules/auth/decorator/roles.decorator';
import { Role } from 'src/modules/auth/enum/role.enum';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async findById(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);
    return product;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.update(id, updateProductDto, file);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Get('download/:productId')
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
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
