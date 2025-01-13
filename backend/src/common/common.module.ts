import { Module } from '@nestjs/common';
import { PrismaProvider } from './providers/prisma/prisma.provider';

import { CloudinaryModule } from './providers/cloudinary/cloudinary.module';

@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
  imports: [CloudinaryModule],
})
export class CommonModule {}
