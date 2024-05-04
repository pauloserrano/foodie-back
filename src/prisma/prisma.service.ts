import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ 
      datasources: {
        db: {
          url: "mongodb+srv://admin:KhqrSwq7eCHZ7dcD@cluster0.ivg5es0.mongodb.net/Cluster0"
        }
      }
    })
  }
}
