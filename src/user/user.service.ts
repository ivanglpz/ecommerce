import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import type { UserCreateInput, UserModel } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma/prisma.service';

const SALT_ROUNDS = 12;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(input: UserCreateInput): Promise<UserModel> {
    const { password, ...rest } = input;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    return this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
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
