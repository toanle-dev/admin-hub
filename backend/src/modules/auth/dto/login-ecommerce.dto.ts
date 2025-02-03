import { IsPhoneNumber } from 'class-validator';

export class LoginEcommerceDto {
  @IsPhoneNumber()
  phone: string;
}
