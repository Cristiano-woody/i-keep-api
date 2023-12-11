import { Note } from "./Note";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  notes?: Note[];
  constructor(data?: User) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.isActive = data.isActive ?? true;
    this.notes = data.notes
  }
}