import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersUseCase } from "../../../implementation/use-cases/user/find-all-users";
import { CreateUserUseCase } from "../../../implementation/use-cases/user/create-user";
import { EmailAlreadyRegistered } from "../../../domain/errors/E-mail-already-registered";
import { FindUserByIdUseCase } from "../../../implementation/use-cases/user/find-user-by-id";
import { FindUserByEmailUseCase } from "../../../implementation/use-cases/user/find-user-by-email";

@Controller('user')
export class UserController {
  constructor(
    private findAllUsers: FindAllUsersUseCase,
    private createUser: CreateUserUseCase,
    private findOneUserById: FindUserByIdUseCase,
    private findOneUserByEmail: FindUserByEmailUseCase,
    ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUser.execute(createUserDto)
    } catch (err) {
      if (err instanceof EmailAlreadyRegistered) {
        return new BadRequestException(err.message)
      }
    }
  }

  @Get()
  findAll() {
    return this.findAllUsers.execute()
  }

  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.findOneUserById.execute(id)
  }


  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.findOneUserByEmail.execute(email)
  }
}
