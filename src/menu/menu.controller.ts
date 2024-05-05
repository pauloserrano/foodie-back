import { Controller, Delete, Get, Put, Post, Body, Param } from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}
  
  @Get()
  getAll() {
    return this.menuService.getAll()
  }

  @Get("now")
  getCurrent() {
    return this.menuService.getCurrent()
  }

  @Post()
  create(@Body() dto: CreateMenuDto) {
    return this.menuService.create(dto)
  }
  
  @Put(":id")
  update(@Param("id") id, @Body() dto: UpdateMenuDto) {
    return this.menuService.update(id, dto)
  }

  @Delete(":id")
  delete(@Param("id") id) {
    return this.menuService.delete(id)
  }
}
