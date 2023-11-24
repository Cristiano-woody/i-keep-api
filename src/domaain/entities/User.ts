import { Note } from "./Note";

export class User {
  id: string
  name: string
  email: string
  password: string
  isActive: boolean;
  notes: Note[];
}