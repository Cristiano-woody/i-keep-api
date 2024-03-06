import { NoteBuilder } from "./builders/NoteBuilder"

export class Note {
  id: string
  title: string
  description: string
  user_id: string

  static builder() {
    return new NoteBuilder()
  }
}