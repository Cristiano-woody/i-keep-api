import { User } from '../../../domain/entities/User';
import {IUserRepository} from "../../protocols/user-repository";
import {IFindUserByIdUseCase} from "../../../domain/use-cases/user/find-user-by-id";
import { UserNotFoundError } from "../../../domain/errors/user-not-found-error";

export class FindUserByIdUseCase implements  IFindUserByIdUseCase{
  constructor(private userRepository: IUserRepository) {
  }
  async execute(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneById(id)
    if(!user) {
      throw new UserNotFoundError()
    }
    return user
  }
}