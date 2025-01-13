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
    return this.prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
      include: {
        category: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: updateProductDto,
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

    const imageUrl = product.imageUrl.split(':');
    const cloudinaryPublicId = imageUrl[1];

    return this.cloudinary.downloadImage(cloudinaryPublicId);
  }
}
