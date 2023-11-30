import { INoteRepository } from "../../../implementation/protocols/note-repository";
import { Repository } from "typeorm";
import { Note } from "../../../domain/entities/Note";
import { BadRequestException } from "@nestjs/common";

export class NoteRepositoryTypeorm implements INoteRepository{
  constructor(private repo: Repository<Note>){}
  async create(data: Note): Promise<Note> {
    return await this.repo.save(data)
  }

  async findAll(): Promise<Note[]> {
    return await this.repo.find()
  }

  async findAllByUserId(userId: string): Promise<Note[]> {
    return await this.repo.find({
      where: {
        user_id: userId
      }
    })
  }

  async findOneById(noteId: string): Promise<Note | undefined> {
    return await this.repo.findOne({
      where: {
        id: noteId
      }
    })
  }

  async remove(note: Note): Promise<Note> {
    return await this.repo.remove(note)
  }

  async update(data: Partial<Note>, noteId: string): Promise<void> {
    await this.repo.update(noteId, data)
  }

}