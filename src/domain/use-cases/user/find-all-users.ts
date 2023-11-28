import { User } from "../../entities/User";

export interface IFindAllUsersUseCase {
  execute(): Promise<User[]>
}