import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UnauthorizedException, UseGuards
} from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersUseCase } from "../../../implementation/use-cases/user/find-all-users";
import { CreateUserUseCase } from "../../../implementation/use-cases/user/create-user";
import { EmailAlreadyRegistered } from "../../../domain/errors/E-mail-already-registered";
import { FindUserByIdUseCase } from "../../../implementation/use-cases/user/find-user-by-id";
import { FindUserByEmailUseCase } from "../../../implementation/use-cases/user/find-user-by-email";
import { LoginDto } from "./dto/login.dto";
import InvalidCredentialsError from "../../../domain/errors/InvalidCredentialsError";
import { LoginUseCase } from "../../../implementation/use-cases/user/login";
import { AuthGuard } from "../auth/auth.guard";

@Controller('user')
export class UserController {
  constructor(
    private findAllUsers: FindAllUsersUseCase,
    private createUser: CreateUserUseCase,
    private findOneUserById: FindUserByIdUseCase,
    private findOneUserByEmail: FindUserByEmailUseCase,
    private loginUseCase: LoginUseCase
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

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.findAllUsers.execute()
  }

  @UseGuards(AuthGuard)
  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.findOneUserById.execute(id)
  }

  @UseGuards(AuthGuard)
  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.findOneUserByEmail.execute(email)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto){
    try {
      return await this.loginUseCase.execute(loginDto)
    } catch (err) {
      if(err instanceof  InvalidCredentialsError) {
        return new UnauthorizedException(err.message)
      }
    }
  }
}
