import { User } from "../../entities/User";

export interface IFindUserByIdUseCase {
  execute(userId: string): Promise<User | undefined>
}