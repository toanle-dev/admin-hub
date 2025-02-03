import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { isAnyArrayBuffer } from 'util/types';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber()
  price?: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  image: any;
}
