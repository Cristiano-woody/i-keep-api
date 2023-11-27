import { User } from "../../entities/User";

export interface FindUserByIdUseCase {
  execute(userId: string): Promise<User | undefined>
}