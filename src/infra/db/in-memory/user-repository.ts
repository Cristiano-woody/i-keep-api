import { IUserRepository } from "../../../implementation/protocols/user-repository";
import { User } from "../../../domain/entities/User";

export class UserRepository implements IUserRepository {
  private users: User[] = []

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(value => value.email === email));
  }

  findOneById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(value => value.id === id));
  }

  register(data: User): Promise<User> {
    this.users.push(data)
    return Promise.resolve(data);
  }
}