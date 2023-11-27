import { Note } from "../../entities/Note"

export type createUserRequest = {
  name: string
  email: string
  password: string
}

export type createUserResponse = {
  id: string
  name: string
  email: string
  isActive: boolean;
  notes?: Note[];
}

export interface CreateUserUseCase {
  execute(data: createUserRequest): Promise<createUserResponse>;
}