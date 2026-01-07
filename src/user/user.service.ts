import { Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import type {
  UserCreateInput,
  UserModel,
  UserUpdateInput,
} from 'src/generated/prisma/models';
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
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        nickname: true,
        profileImage: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }
  async update(
    id: number,
    data: Pick<UserUpdateInput, 'name' | 'nickname' | 'profileImage'>,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await this.prisma.user.update({
      where: { id },
      data: data,
    });
    return 'This user has been updated';
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: { id },
      include: {
        organizations: true,
      },
    });
    return 'This user has been removed';
  }
}
