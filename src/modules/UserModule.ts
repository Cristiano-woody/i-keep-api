import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/UserEntity';
import { UserController } from 'src/controllers/UserController';
import { UserService } from 'src/services/UserService';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => AuthModule), 
    TypeOrmModule.forFeature([User]),     
    JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (config:ConfigService) => ({
      secret: config.get('JWT_SECRET_KEY'),
      global: true,
      signOptions: { expiresIn: '1h' }
    })
  }),],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
