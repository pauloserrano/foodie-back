import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator"

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsBoolean()
  @IsNotEmpty()
  isDaytime: boolean
}

export class UpdateMenuDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isDaytime?: boolean
}
