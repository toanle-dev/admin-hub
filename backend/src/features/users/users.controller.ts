import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './Users.service';
import { Roles } from 'src/modules/auth/decorator/roles.decorator';
import { Role } from 'src/modules/auth/enum/role.enum';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
