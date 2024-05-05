import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';


@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  
  @Get()
  get() {
    return "Get all categories"
  }

  @Post()
  create() {
    return "create new category"
  }
  
  @Put()
  update() {
    return "update category"
  }

  @Delete()
  delete() {
    return "delete category"
  }
}
