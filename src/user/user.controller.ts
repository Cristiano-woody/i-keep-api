import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { User } from 'src/user/entities/UserEntity';
import { UserService } from 'src/user/user.service';
import UserAlreadyExistError from 'src/errors/UserAlreadyExistError';
import { AuthGuard } from 'src/auth/auth.guard';
import {FindAllUsersUseCase} from "../implementation/use-cases/user/find-all-users";

@Controller('/user')
export class UserController {
  constructor(private userService: UserService, private findAllUsersService: FindAllUsersUseCase) {}

  @Get()
  async findAll(): Promise<any> {
    return this.findAllUsersService.execute()
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    try {
      const userCreated = await this.userService.create(body);
      return userCreated;
    } catch (err) {
      if (err instanceof UserAlreadyExistError) {
        throw new BadRequestException(err.message)
      }
    }
  }

  @Get(':id')
  async findOnebyID(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.findOnebyID(id);
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
