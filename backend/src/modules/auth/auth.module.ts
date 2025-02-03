import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaProvider } from 'src/common/providers/prisma/prisma.provider';
import { AuthService } from './auth.service';
import { JwtEcommerceStrategy } from './strategy/jwt-ecommerce.strategy';

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
    JwtEcommerceStrategy,
    // Global
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
