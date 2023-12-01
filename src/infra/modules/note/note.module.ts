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

@Module({
  controllers: [NoteController],
  imports: [
    TypeOrmModule.forFeature([UserSchema, User])
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
