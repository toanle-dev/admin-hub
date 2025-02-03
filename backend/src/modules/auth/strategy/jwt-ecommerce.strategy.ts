import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenJWTEcommerce } from '../interfaces/jwt-ecommerce';

@Injectable()
export class JwtEcommerceStrategy extends PassportStrategy(
  Strategy,
  'jwt-ecommerce',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<TokenJWTEcommerce> {
    return {
      phone: payload.phone,
    };
  }
}
