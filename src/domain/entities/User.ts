import { Note } from "./Note";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  notes?: Note[];
  constructor(data: User) {
    // usado por ORM
    if(!data) {
      this.id = ''
      return
    }
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.isActive = data.isActive ?? true;
    this.notes = data.notes
  }

  static create(data: User) {
    return new User(data)
  }
}