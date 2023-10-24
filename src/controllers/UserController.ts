// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/CreateUserDto';
import { User } from 'src/entities/UserEntity';
import { UserService } from 'src/services/UserService';
import UserAlreadyExistError from 'src/errors/UserAlreadyExistError';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    try {
      const userCreated = await this.userService.create(body);
      return userCreated;
    } catch (err) {
      if (err instanceof UserAlreadyExistError) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
