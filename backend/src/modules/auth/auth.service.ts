import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaProvider } from 'src/common/providers/prisma/prisma.provider';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role as RoleEnum } from './enum/role.enum';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  // Simula um banco de códigos temporários
  private tempUsers = new Map<string, string>();

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

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      phone: '',
    };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async generateTemporaryCode(phone: string) {
    // Código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.tempUsers.set(phone, code);
    return { message: 'Código enviado', code };
  }

  async verifyCodeAndGenerateToken(phone: string, code: string) {
    // Valida codigo de verificação
    if (this.tempUsers.get(phone) !== code) {
      throw new UnauthorizedException('Código inválido');
    }

    // Localiza usuario pelo telefone
    let user = await this.prisma.user.findFirst({
      where: {
        phone: phone,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: phone.concat('@undefined'),
          phone: phone,
          password: '',
          roleId: RoleEnum.CUSTOMER,
        },
        include: {
          role: true,
        },
      });
    }

    // Gera o token
    const access_token = this.jwtService.sign(<JwtPayload>{
      sub: user.id,
      email: user.email,
      role: user.role,
      phone: phone,
    });

    return { access_token };
  }

  async getRoles(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  verifyToken<T extends object = any>(token: string): T {
    try {
      return this.jwtService.verify<T>(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
