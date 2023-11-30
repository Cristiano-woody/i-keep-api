import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserSchema } from "../infra/db/typeorm/schemas/user-schema";
import {UserRepositoryTypeorm} from "../infra/db/typeorm/user-repository-typeorm";
import {User} from "../domain/entities/User";
import {FindAllUsersUseCase} from "../implementation/use-cases/user/find-all-users";
import {IUserRepository} from "../implementation/protocols/user-repository";
import {DataSource} from "typeorm";

@Module({
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
  controllers: [UserController],
  providers: [UserService,
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
    }
  ],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
