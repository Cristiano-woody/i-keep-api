import { User } from '../../../domain/entities/User';
import {IUserRepository} from "../../protocols/user-repository";
import {IFindUserByIdUseCase} from "../../../domain/use-cases/user/find-user-by-id";

export class FindUserByIdUseCase implements  IFindUserByIdUseCase{
  constructor(private userRepository: IUserRepository) {
  }
  async execute(id: string): Promise<User | undefined> {
    return await this.userRepository.findOneById(id)
  }
}