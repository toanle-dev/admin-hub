import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaProvider } from 'src/common/providers/prisma/prisma.provider';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LoginEcommerceDto } from './dto/login-ecommerce.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaProvider,
  ) {}

  async register(dto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    return await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        roleId: 1,
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        role: true,
      },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async loginEcommerce(dto: LoginEcommerceDto) {

    // TODO: Criar validação de autenticação via mensagem para o celular

    const token = this.jwtService.sign({ phone: dto.phone });

    return { access_token: token };
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
