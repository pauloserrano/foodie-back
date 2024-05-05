import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator"

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsInt()
  @IsNotEmpty()
  price: number

  @IsString()
  @IsNotEmpty()
  imageSrc: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  menuId: string

  @IsString()
  @IsNotEmpty()
  categoryId: string
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  price?: number

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  imageSrc?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  menuId?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  categoryId?: string
}
