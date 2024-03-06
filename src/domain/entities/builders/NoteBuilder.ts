import { Note } from "../Note";

export class NoteBuilder {
  private note: Note;

  constructor() {
    this.note = new Note();
  }

  withId(id: string): NoteBuilder {
    this.note.id = id;
    return this;
  }

  withTitle(title: string): NoteBuilder {
    this.note.title = title;
    return this;
  }

  withDescription(description: string): NoteBuilder {
    this.note.description = description;
    return this;
  }

  withUserId(user_id: string): NoteBuilder {
    this.note.user_id = user_id;
    return this;
  }

  build(): Note {
    return this.note;
  }
}