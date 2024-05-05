import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"

@Injectable({})
export class AuthService{
  constructor(private prisma: PrismaService) {}
  
  async signup(dto: AuthDto) {
    const isEmailDuplicate = await this.prisma.user.findFirst({
      where: { email: dto.email }
    })

    if (isEmailDuplicate) {
      throw new ForbiddenException("The email provided is already taken.")
    }

    const hash = await argon.hash(dto.password)
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash
      }
    })

    delete user.hash

    return user
    
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email }
    })

    if (!user) {
      throw new ForbiddenException("Incorrect credentials.")
    }

    const isPasswordValid = await argon.verify(user.hash, dto.password)

    if (!isPasswordValid) {
      throw new ForbiddenException("Incorrect credentials.")
    }

    delete user.hash

    return user

  }
}