import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePartDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  // ✅ Thêm các field mới
  @IsOptional()
  @IsString()
  titleDescription?: string;

  @IsOptional()
  @IsString()
  headerContent?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
