import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { UserSchema } from "./infra/db/typeorm/schemas/user-schema";
import { NoteSchema } from "./infra/db/typeorm/schemas/note-schema";
import { UserModule } from './infra/modules/user/user.module';
import { NoteModule } from './infra/modules/note/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('dbHost'),
        port: config.get('dbPort'),
        username: config.get('dbUser'),
        password: config.get('dbPassword'),
        database: config.get('DataBase'),
        entities: [UserSchema, NoteSchema],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
