import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaProvider } from 'src/common/providers/prisma/prisma.provider';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaProvider,
    AuthService,
    JwtStrategy,

    // Global
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
