import {
  createNoteUseCaseRequest,
  createNoteUseCaseResponse,
  ICreateNoteUseCase
} from "../../../domain/use-cases/note/create-note";
import {INoteRepository} from "../../protocols/note-repository";
import {Note} from "../../../domain/entities/Note";
import {IUuidGenerate} from "../../helpers/uuid-generate";
import { IUserRepository } from "../../protocols/user-repository";
import { UserNotFoundError } from "../../../domain/errors/user-not-found-error";

export class CreateNoteUseCase implements  ICreateNoteUseCase{
  constructor(private noteRepository: INoteRepository, private uuidGenerate: IUuidGenerate, private userRepository: IUserRepository) {
  }

  async execute(data: createNoteUseCaseRequest): Promise<createNoteUseCaseResponse> {
    const user = await this.userRepository.findOneById(data.userId)
    if(user == undefined) {
      throw new UserNotFoundError()
    }
    const newNote = new Note()
    newNote.id = await this.uuidGenerate.execute()
    newNote.title = data.title
    newNote.description = data.description
    newNote.user_id = data.userId
    await this.noteRepository.create(newNote)
    return ({
      title: newNote.title,
      description: newNote.description,
      id: newNote.id
    })
  }
}