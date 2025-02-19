import { Body, Controller, Get, Post } from '@nestjs/common';

import { Public } from './decorator/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GenerateCodeDto } from './dto/generate-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('generate-code')
  async generateCode(@Body() data: GenerateCodeDto) {
    return this.authService.generateTemporaryCode(data.phone);
  }

  @Public()
  @Post('verify-code')
  async verifyCode(@Body() data: VerifyCodeDto) {
    return this.authService.verifyCodeAndGenerateToken(data.phone, data.code);
  }

  @Public()
  @Get('roles')
  async getRoles() {
    return this.authService.getRoles();
  }
}
