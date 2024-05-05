import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';


@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  
  @Get()
  getAll() {
    return this.categoryService.getAll()
  }

  @Get(":id")
  getById(@Param("id") id) {
    return this.categoryService.getById(id)
  }

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto)
  }
  
  @Put(":id")
  update(@Param("id") id, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto)
  }

  @Delete(":id")
  delete(@Param("id") id) {
    return this.categoryService.delete(id)
  }
}
