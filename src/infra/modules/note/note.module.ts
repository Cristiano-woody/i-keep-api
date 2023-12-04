import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "../../db/typeorm/schemas/user-schema";
import { User } from "../../../domain/entities/User";
import { DataSource } from "typeorm";
import { NoteRepositoryTypeorm } from "../../db/typeorm/note-repository-typeorm";
import { Note } from "../../../domain/entities/Note";
import { CreateNoteUseCase } from "../../../implementation/use-cases/note/create-note";
import { INoteRepository } from "../../../implementation/protocols/note-repository";
import { UserRepositoryTypeorm } from "../../db/typeorm/user-repository-typeorm";
import { IUserRepository } from "../../../implementation/protocols/user-repository";
import { FindAllNotesUseCase } from "../../../implementation/use-cases/note/find-all-notes";
import { FindAllNotesByUserIdUseCase } from "../../../implementation/use-cases/note/find-all-notes-by-user-id";
import { RemoveNoteUseCase } from "../../../implementation/use-cases/note/remove-note";
import { UpdateNoteUseCase } from "../../../implementation/use-cases/note/update-note";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [NoteController],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config:ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        global: true,
        signOptions: { expiresIn: '1h' }
      })
    }),
    TypeOrmModule.forFeature([UserSchema, User]),
    AuthModule
  ],
  providers: [
    {
      provide: NoteRepositoryTypeorm,
      useFactory: (dataSource: DataSource) => {
        return new NoteRepositoryTypeorm(dataSource.getRepository(Note))
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: UserRepositoryTypeorm,
      useFactory: (dataSource: DataSource) => {
        return new UserRepositoryTypeorm(dataSource.getRepository(User))
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: CreateNoteUseCase,
      useFactory: (noteRepo: INoteRepository, userRepo: IUserRepository) => {
        return new CreateNoteUseCase(noteRepo, userRepo)
      },
      inject: [NoteRepositoryTypeorm, UserRepositoryTypeorm]
    },
    {
      provide: FindAllNotesUseCase,
      useFactory: (noteRepo: INoteRepository) => {
        return new FindAllNotesUseCase(noteRepo)
      },
      inject: [NoteRepositoryTypeorm]
    },
    {
      provide: FindAllNotesByUserIdUseCase,
      useFactory: (noteRepo: INoteRepository, userRepo: IUserRepository) => {
        return new FindAllNotesByUserIdUseCase(noteRepo, userRepo)
      },
      inject: [NoteRepositoryTypeorm, UserRepositoryTypeorm]
    },
    {
      provide: RemoveNoteUseCase,
      useFactory: (noteRepo: INoteRepository) => {
        return new RemoveNoteUseCase(noteRepo)
      },
      inject: [NoteRepositoryTypeorm]
    },
    {
      provide: UpdateNoteUseCase,
      useFactory: (noteRepo: INoteRepository) => {
        return new UpdateNoteUseCase(noteRepo)
      },
      inject: [NoteRepositoryTypeorm]
    }
  ],
})
export class NoteModule {}
