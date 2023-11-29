import {IFindAllNotesByUserIdUseCase} from "../../../domain/use-cases/note/find-all-notes-by-user-id";
import {INoteRepository} from "../../protocols/note-repository";
import {Note} from "../../../domain/entities/Note";
import { UserNotFoundError } from "../../../domain/errors/user-not-found-error";
import { IUserRepository } from "../../protocols/user-repository";

export class FindAllNotesByUserIdUseCase implements  IFindAllNotesByUserIdUseCase{
  constructor(private noteRepository: INoteRepository, private userRepository: IUserRepository) {}
  async execute(userId: string): Promise<Note[]> {
    const user = await this.userRepository.findOneById(userId)
    if(user == undefined) {
      throw new UserNotFoundError()
    }
    return await this.noteRepository.findAllByUserId(userId)
  }
}