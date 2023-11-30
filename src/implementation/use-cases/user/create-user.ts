import {createUserRequest, createUserResponse, ICreateUserUseCase} from "../../../domain/use-cases/user/create-user";
import {IUserRepository} from "../../protocols/user-repository";
import {User} from "../../../domain/entities/User";
import {ICrypto} from "../../helpers/crypto";
import { EmailAlreadyRegistered } from "../../../domain/errors/E-mail-already-registered";
import { v4 as uuidv4 } from 'uuid';

export class CreateUserUseCase implements  ICreateUserUseCase {
  constructor(private userRepository: IUserRepository, private crypto: ICrypto) {}
  async execute(data: createUserRequest): Promise<createUserResponse> {
    const userExists = this.userRepository.findOneByEmail(data.email)
    if(userExists) {
      throw new EmailAlreadyRegistered()
    }
    const newUser = new User()
    newUser.id = uuidv4()
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