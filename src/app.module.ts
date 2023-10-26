import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/UserEntity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { NoteModule } from './note/note.module';
import { Note } from './note/entities/note.entity';

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
        entities: [User, Note],
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
