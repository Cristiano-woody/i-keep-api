import { IUserRepository } from "../../../implementation/protocols/user-repository";
import { Repository } from "typeorm";
import { User } from "../../../domain/entities/User";

export class UserRepositoryTypeorm implements IUserRepository{
  constructor(private repo: Repository<User>){}

  async findAll(): Promise<User[]> {
    return await this.repo.find()
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.repo.findOne({
      where: {
        email: email
      }
    })
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.repo.findOne({
      where: {
        id: id
      },
      relations: ['notes']
    })
  }

  register(data: User): Promise<User> {
    return this.repo.save(data)
  }
}