import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService, private utils: UtilsService) {}

  async getAll() {
    return await this.prisma.category.findMany({})
  }

  async getById(id: string) {
    const isValidId = this.utils.isValidObjectId(id)
    if (!isValidId) {
      throw new BadRequestException("Invalid ID")
    }

    const category = await this.prisma.category.findFirst({ 
      where: { id },
      include: { products: true }
    })
    if (!category) {
      throw new NotFoundException("Category not found")
    }
    
    return category
  }
  
  async create(dto: CreateCategoryDto) {
    return await this.prisma.category.create({ data: { ...dto } })
  }

  async update(id: Category["id"], dto: UpdateCategoryDto) {
    const isValidId = this.utils.isValidObjectId(id)

    if (!isValidId) {
      throw new BadRequestException("Invalid ID")
    }

    const category = await this.prisma.category.findFirst({ where: { id } })

    if (!category) {
      throw new NotFoundException("Category not found")
    }

    return await this.prisma.category.update({ where: { id }, data: { ...dto } })
  }

  async delete(id: Category["id"]) {
    const isValidId = this.utils.isValidObjectId(id)

    if (!isValidId) {
      throw new BadRequestException("Invalid ID")
    }

    const category = await this.prisma.category.findFirst({ where: { id } })

    if (!category) {
      throw new NotFoundException("Category not found")
    }
    
    return await this.prisma.category.delete({ where: { id }})
  }
}
