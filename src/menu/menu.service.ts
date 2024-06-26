import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService, private utils: UtilsService) {}

  async getAll() {
    return await this.prisma.menu.findMany({})
  }

  async getCurrent() {
    const hour = new Date().getHours()
    if (hour > 6 && hour < 18){
      return await this.prisma.menu.findFirst({
        where: { isDaytime: true },
        include: { products: true }
      })
    }
    
    return await this.prisma.menu.findFirst({
      where: { isDaytime: false },
      include: { products: true }
    })
  }

  async create(dto: CreateMenuDto) {
    const currentMenu = await this.prisma.menu.findFirst({ where: { isDaytime: dto.isDaytime } })
    if (currentMenu){
      throw new BadRequestException("The current time of day is already occupied.")
    }

    return await this.prisma.menu.create({ data: { ...dto } })
  }

  async update(id: Menu["id"], dto: UpdateMenuDto) {
    const isValidId = this.utils.isValidObjectId(id)
    if (!isValidId) {
      throw new BadRequestException("Invalid ID")
    }

    const menu = await this.prisma.menu.findFirst({ where: { id } })
    if (!menu) {
      throw new NotFoundException("Menu not found")
    }

    return await this.prisma.menu.update({
      data: { ...dto },
      where: { id }
    })
  }

  async delete(id: Menu["id"]) {
    const isValidId = this.utils.isValidObjectId(id)
    if (!isValidId) {
      throw new BadRequestException("Invalid ID")
    }

    const menu = await this.prisma.menu.findFirst({ where: { id } })
    if (!menu) {
      throw new NotFoundException("Menu not found")
    }

    return await this.prisma.menu.delete({ where: { id } })
  }
}
