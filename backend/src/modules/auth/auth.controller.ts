import { Body, Controller, Post } from '@nestjs/common';

import { Public } from './decorator/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginEcommerceDto } from './dto/login-ecommerce.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login-ecommerce')
  loginEcommerce(@Body() loginDto: LoginEcommerceDto) {
    return this.authService.loginEcommerce(loginDto);
  }
}
