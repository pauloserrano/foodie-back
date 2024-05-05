import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  
  @Get()
  get() {
    return "Get all products"
  }

  @Post()
  create() {
    return "create new produt"
  }
  
  @Put()
  update() {
    return "update produt"
  }

  @Delete()
  delete() {
    return "delete produt"
  }
}
