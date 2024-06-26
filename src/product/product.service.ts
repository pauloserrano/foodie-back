import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService, private utils: UtilsService) {}

  async getAll() {
    return await this.prisma.product.findMany({})
  }

  async getById(id: string) {
    const isValidId = this.utils.isValidObjectId(id)
    if (!isValidId) {
      throw new BadRequestException("Invalid ID")
    }

    const product = await this.prisma.product.findFirst({ where: { id }})
    if (!product){
      throw new NotFoundException()
    }

    return product
  }
  
  async create(dto: CreateProductDto) {
    const isMenuIdValid = this.utils.isValidObjectId(dto.menuId)
    if (!isMenuIdValid){
      throw new BadRequestException("Invalid MenuId")
    }

    const doesMenuIdExist = await this.prisma.menu.findFirst({ where: { id: dto.menuId } })
    if (!doesMenuIdExist){
      throw new NotFoundException("MenuId Not Found")
    }

    const isCategoryIdValid = this.utils.isValidObjectId(dto.categoryId)
    if (!isCategoryIdValid){
      throw new BadRequestException("Invalid CategoryId")
    }
    
    const doesCategoryIdExist = await this.prisma.category.findFirst({ where: { id: dto.categoryId } })
    if (!doesCategoryIdExist){
      throw new NotFoundException("CategoryId Not Found")
    }

    return await this.prisma.product.create({ data: { ...dto }})
  }

  async update(id: string, dto: UpdateProductDto) {
    if (dto.menuId) {
      const isMenuIdValid = this.utils.isValidObjectId(dto.menuId)
      if (!isMenuIdValid){
        throw new BadRequestException("Invalid MenuId")
      }
  
      const doesMenuIdExist = await this.prisma.menu.findFirst({ where: { id: dto.menuId } })
      if (!doesMenuIdExist){
        throw new NotFoundException("MenuId Not Found")
      }
    }

    if (dto.categoryId) {
      const isCategoryIdValid = this.utils.isValidObjectId(dto.categoryId)
      if (!isCategoryIdValid){
        throw new BadRequestException("Invalid CategoryId")
      }
      
      const doesCategoryIdExist = await this.prisma.category.findFirst({ where: { id: dto.categoryId } })
      if (!doesCategoryIdExist){
        throw new NotFoundException("CategoryId Not Found")
      }
    }

    return await this.prisma.product.update({
      where: { id },
      data: { ...dto }
    })
  }

  async delete(id: string) {
    const isValidId = this.utils.isValidObjectId(id)
    if (!isValidId) {
      throw new BadRequestException("Invalid ID")
    }

    const product = await this.prisma.product.findFirst({ where: { id } })
    if (!product) {
      throw new NotFoundException("Product not found")
    }

    return this.prisma.product.delete({ where: { id }})
  }
}
