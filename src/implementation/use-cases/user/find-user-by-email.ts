import { User } from "../../entities/User";

export interface IFindUserByEmailUseCase {
  execute(email: string): Promise<User | undefined>
}