import { User } from "../../entities/User";

export interface FindAllUsersUseCase {
  execute(): Promise<User[]>
}