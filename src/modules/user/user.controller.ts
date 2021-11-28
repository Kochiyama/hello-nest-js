import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '.prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll({});
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<User> {
    return await this.userService.findOne({ uuid });
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<User> {
    return await this.userService.remove(uuid);
  }
}
