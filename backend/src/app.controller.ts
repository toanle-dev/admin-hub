import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaProvider } from './common/providers/prisma/prisma.provider';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaProvider,
    private readonly appService: AppService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const users = await this.prisma.user.findMany();

    console.log('Users', users);

    return this.appService.getHello();
  }
}
