import { Injectable } from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaProvider } from 'src/common/providers/prisma/prisma.provider';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaProvider) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: number, category: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id: Number(id) },
      data: category,
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(categoryId: number) {
    return this.prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });
  }

  async updateStock(id: number, quantity: number) {
    return this.prisma.product.update({
      where: { id },
      data: {
        stock: { decrement: quantity },
      },
    });
  }
}
