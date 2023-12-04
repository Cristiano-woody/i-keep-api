import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config:ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        global: true,
        signOptions: { expiresIn: '1h' }
      })
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [AuthGuard],
  exports: [AuthGuard]
})
export class AuthModule {}
