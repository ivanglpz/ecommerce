import { Injectable } from '@nestjs/common';
import { UserCreateInput, UserModel } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: UserCreateInput): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user `;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
