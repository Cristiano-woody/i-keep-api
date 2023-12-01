import { forwardRef, Module } from "@nestjs/common";
import { UserController } from './user.controller';
import { AuthModule } from "../../../auth/auth.module";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "../../db/typeorm/schemas/user-schema";
import { User } from "../../../domain/entities/User";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserRepositoryTypeorm } from "../../db/typeorm/user-repository-typeorm";
import { DataSource } from "typeorm";
import { FindAllUsersUseCase } from "../../../implementation/use-cases/user/find-all-users";
import { IUserRepository } from "../../../implementation/protocols/user-repository";
import { CreateUserUseCase } from "../../../implementation/use-cases/user/create-user";
import { ICrypto } from "../../../implementation/helpers/crypto";
import { Crypto } from "../../helpers/crypto";
import { FindUserByIdUseCase } from "../../../implementation/use-cases/user/find-user-by-id";
import { FindUserByEmailUseCase } from "../../../implementation/use-cases/user/find-user-by-email";

@Module({
  controllers: [UserController],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserSchema, User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        global: true,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [
    Crypto,
    {
      provide: UserRepositoryTypeorm,
      useFactory: (dataSource: DataSource) => {
        return new UserRepositoryTypeorm(dataSource.getRepository(User))
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: FindAllUsersUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new FindAllUsersUseCase(userRepo)
      },
      inject: [UserRepositoryTypeorm]
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: IUserRepository, crypto: ICrypto) => {
        return new CreateUserUseCase(userRepo, crypto)
      },
      inject: [UserRepositoryTypeorm, Crypto]
    },
    {
      provide: FindUserByIdUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new FindUserByIdUseCase(userRepo)
      },
      inject: [UserRepositoryTypeorm]
    },
    {
      provide: FindUserByEmailUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new FindUserByEmailUseCase(userRepo)
      },
      inject: [UserRepositoryTypeorm]
    }
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
