import { User } from '../../../domain/entities/User';
import {IUserRepository} from "../../protocols/user-repository";
import {IFindAllUsersUseCase} from "../../../domain/use-cases/user/find-all-users";

export class FindAllUsersUseCase implements  IFindAllUsersUseCase{
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll()
  }
}