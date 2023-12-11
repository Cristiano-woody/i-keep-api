import { INoteRepository } from "../../../implementation/protocols/note-repository";
import { Note } from "../../../domain/entities/Note";

export class NoteRepository implements INoteRepository {
  private notes: Note[] = []

  create(data: Note): Promise<Note> {
    this.notes.push(data)
    return Promise.resolve(data);
  }

  async findAll(): Promise<Note[]> {
    return this.notes
  }

  findAllByUserId(userId: string): Promise<Note[]> {
    return Promise.resolve(this.notes.filter(note => note.user_id === userId));
  }
  findOneById(noteId: string): Promise<Note | undefined> {
    return Promise.resolve(this.notes.find(note => note.id === noteId));
  }

  remove(note: Note): Promise<Note> {
    this.notes = this.notes.filter(n => n !== note)
    return Promise.resolve(note);
  }

  update(data: Partial<Note>, noteId: string): Promise<Note> {
    this.notes = this.notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, ...data };
      }
      return note;
    });
    return Promise.resolve(this.notes.find(note => note.id === noteId))
  }
}