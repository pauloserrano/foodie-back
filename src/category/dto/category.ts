import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string
}
