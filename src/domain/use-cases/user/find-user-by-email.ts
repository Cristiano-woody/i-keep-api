import { User } from "../../entities/User";

export interface FindUserByEmailUseCase {
  execute(email: string): Promise<User | undefined>
}