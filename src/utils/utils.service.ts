import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  isValidObjectId(id: string) {
    return (/^[0-9a-fA-F]{24}$/).test(id)
  }
}