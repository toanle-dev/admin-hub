import { IsString } from 'class-validator';

export class GenerateCodeDto {
  @IsString()
  phone: string;
}
