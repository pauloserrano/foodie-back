import { Injectable } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    console.log("Get All")
  }

  async getCurrent() {
    console.log(`Get menu for ${Date.now()}`)
  }

  async create(dto: CreateMenuDto) {
    console.log(dto)
  }

  async update(id: Menu["id"], dto: UpdateMenuDto) {
    console.log(dto)
  }

  async delete(id: Menu["id"]) {
    console.log(`Delete ${id}`)
  }
}
