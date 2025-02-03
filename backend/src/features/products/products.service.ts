import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { PrismaProvider } from 'src/common/providers/prisma/prisma.provider';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from 'src/common/providers/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly cloudinary: CloudinaryService,
    private readonly prisma: PrismaProvider,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const result = await this.cloudinary.uploadImage(
      file.path,
      'admin-hub/products',
    );

    createProductDto.imageUrl = 'cloudinary:' + result.public_id;

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findOne(productId: number) {
    const data = await this.prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
      include: {
        category: true,
      },
    });
    return data;
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async update(
    productId: number,
    dto: UpdateProductDto,
    file: Express.Multer.File,
  ) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    // Verifica se foi enviada uma nova imagem do produto
    if (file) {
      // Envia nova imagem no produto para o cloudinary
      const result = await this.cloudinary.uploadImage(
        file.path,
        'admin-hub/products',
      );

      dto.imageUrl = 'cloudinary:' + result.public_id;
    }

    // Apaga imagem antiga do produto no cloudinary caso exista
    if (product.imageUrl) {
      const publicId = product.imageUrl.split(':')[1];
      await this.cloudinary.deleteImage(publicId);
    }

    // Salva produto
    return this.prisma.product.update({
      where: { id: productId },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        imageUrl: dto.imageUrl || null,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }

  async downloadImage(productId: number): Promise<Buffer> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    // TODO: Caso não possua a imagem na base de dados retornar que não possue imagem
    const imageUrl = product.imageUrl.split(':');
    const publicId = imageUrl[1];

    return this.cloudinary.downloadImage(publicId);
  }
}
