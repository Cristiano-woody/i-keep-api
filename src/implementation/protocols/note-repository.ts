import {Note} from "../../domain/entities/Note";

export interface INoteRepository {
    create(data: Note): Promise<Note>
    findAllByUserId(userId: string): Promise<Note[]>
    findAll(): Promise<Note[]>
    remove(noteId: string): Promise<Note>
    update(data: Partial<Note>): Promise<Note>
    findOneById(noteId: string): Promise<Note | undefined>
}