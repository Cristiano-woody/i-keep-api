import {Note} from "../../domain/entities/Note";

export interface INoteRepository {
    create(data: Note): Promise<Note>
    findAllByUserId(userId: string): Promise<Note[]>
    findAll(): Promise<Note[]>
    remove(note: Note): Promise<Note>
    update(data: Partial<Note>, noteId: string): Promise<void>
    findOneById(noteId: string): Promise<Note | undefined>
}