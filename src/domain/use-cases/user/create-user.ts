import { Note } from "../../entities/Note"

export interface ICreateUserUseCase {
  execute(data: createUserRequest): Promise<createUserResponse>;
}

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