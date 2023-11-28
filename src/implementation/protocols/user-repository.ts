import {User} from "../../domain/entities/User";

export interface IUserRepository {
  register(data: User): Promise<User>
  findAll(): Promise<User[]>
  findOneByEmail(email: string): Promise<User | undefined>
  findOneById(id: string): Promise<User | undefined>
}