import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/CreateUserDto';
import { User } from 'src/entities/UserEntity';
import { UserService } from 'src/services/UserService';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const userCreated = await this.userService.create(body);
    return userCreated;
  }
}
