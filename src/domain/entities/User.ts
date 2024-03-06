import { Note } from "./Note";
import { UserBuilder } from "./builders/UserBuilder";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  notes?: Note[];
  constructor() {
  }

  static builder(): UserBuilder {
    return new UserBuilder();
  }
}