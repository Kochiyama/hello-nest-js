import { Prisma, User } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const alreadyExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (alreadyExists)
      throw new HttpException(
        'Email Already Registered',
        HttpStatus.BAD_REQUEST,
      );

    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return await this.prisma.user.findMany({
      ...params,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { uuid },
    });

    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    return await this.prisma.user.update({
      where: { uuid },
      data: updateUserDto,
    });
  }

  async remove(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid },
    });

    if (!user) throw new HttpException('User Not found', HttpStatus.NOT_FOUND);

    return this.prisma.user.delete({
      where: { uuid },
    });
  }
}
