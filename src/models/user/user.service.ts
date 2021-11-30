import { Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser)
      throw new HttpException(
        'Email already registered!',
        HttpStatus.BAD_REQUEST,
      );

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        birthday: new Date(createUserDto.birthday),
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return await this.prisma.user.findMany({
      ...params,
    });
  }

  async findOne(uuid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { uuid },
    });

    if (!existingUser)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    return await this.prisma.user.update({
      data: updateUserDto,
      where: { uuid },
    });
  }

  async remove(uuid: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { uuid },
    });

    if (!existingUser)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    return await this.prisma.user.delete({
      where: { uuid },
    });
  }
}
