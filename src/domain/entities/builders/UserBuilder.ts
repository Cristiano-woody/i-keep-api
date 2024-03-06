import { Note } from "../Note";
import { User } from "../User";

export class UserBuilder {
  private user: User;

  constructor() {
    this.user = new User();
  }

  withId(id: string): UserBuilder {
    this.user.id = id;
    return this;
  }

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  withIsActive(isActive: boolean): UserBuilder {
    this.user.isActive = isActive;
    return this;
  }

  withNotes(notes: Note[]): UserBuilder {
    this.user.notes = notes;
    return this;
  }

  build(): User {
    return this.user;
  }
}