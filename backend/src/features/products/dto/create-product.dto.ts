import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  stock: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  categoryId?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
