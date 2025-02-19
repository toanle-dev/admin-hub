import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { Role } from 'src/modules/auth/enum/role.enum';
import { Roles } from 'src/modules/auth/decorator/roles.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  async update(@Param('id') id: number, @Body() data: UpdateCategoryDto) {
    return this.categoriesService.update(id, data);
  }
}
