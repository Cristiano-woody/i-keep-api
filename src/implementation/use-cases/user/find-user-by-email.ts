import { User } from '../../../domain/entities/User';
import {IUserRepository} from "../../protocols/user-repository";
import {IFindUserByEmailUseCase} from "../../../domain/use-cases/user/find-user-by-email";
import { UserNotFoundError } from "../../../domain/errors/user-not-found-error";

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {
  }
  async execute(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneByEmail(email)
    if(!user) {
      throw new UserNotFoundError()
    }
    return user
  }
}