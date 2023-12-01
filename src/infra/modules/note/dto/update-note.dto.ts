import { Note } from "../../../../domain/entities/Note";

export type UpdateNoteDto = Partial<Omit<Note, "id">>
