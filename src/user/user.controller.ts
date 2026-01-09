import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/roles.decorator';
import type {
  UserCreateInput,
  UserUpdateInput,
} from 'src/generated/prisma/models';
import { UserService } from './user.service';

@Controller('user')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() data: UserCreateInput) {
    return this.userService.createUser(data);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Pick<UserUpdateInput, 'name' | 'nickname' | 'profileImage'>,
  ) {
    return this.userService.update(Number(id), data);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}
