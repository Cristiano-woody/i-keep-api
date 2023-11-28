import {createUserRequest, createUserResponse, ICreateUserUseCase} from "../../../domain/use-cases/user/create-user";
import {IUserRepository} from "../../protocols/user-repository";
import {User} from "../../../domain/entities/User";
import {IUuidGenerate} from "../../helpers/uuid-generate";
import {ICrypto} from "../../helpers/crypto";

export class CreateUserUseCase implements  ICreateUserUseCase {
  constructor(private userRepository: IUserRepository, private uuidGenerate: IUuidGenerate, private crypto: ICrypto) {}
  async execute(data: createUserRequest): Promise<createUserResponse> {
    const newUser = new User()
    newUser.id = await this.uuidGenerate.execute()
    newUser.email = data.email
    newUser.name = data.name
    newUser.isActive = true
    newUser.notes = []
    newUser.password = await this.crypto.hash(data.password)
    await this.userRepository.register(newUser)
    return ({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isActive: newUser.isActive,
      notes: newUser.notes
    })
  }
}