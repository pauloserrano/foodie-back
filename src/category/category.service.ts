import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidObjectId } from 'src/utils';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.category.findMany({})
  }
  
  async create(dto: CreateCategoryDto) {
    return await this.prisma.category.create({ data: { ...dto } })
  }

  async update(id: Category["id"], dto: UpdateCategoryDto) {
    const isValidId = isValidObjectId(id)

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
    const isValidId = isValidObjectId(id)

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
