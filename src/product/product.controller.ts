import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  
  @Get()
  getAll() {
    return this.productService.getAll()
  }

  @Get(":id")
  getById(@Param("id") id) {
    return this.productService.getById(id)
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }
  
  @Put(":id")
  update(@Param("id") id, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto)
  }

  @Delete(":id")
  delete(@Param("id") id) {
    return this.productService.delete(id)
  }
}
