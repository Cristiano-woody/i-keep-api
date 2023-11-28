import { User } from '../../../domain/entities/User';
import {IUserRepository} from "../../protocols/user-repository";
import {IFindUserByEmailUseCase} from "../../../domain/use-cases/user/find-user-by-email";

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {
  }
  async execute(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneByEmail(email)
  }
}