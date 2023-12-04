import { ILoginUseCase, loginUseCaseRequest, loginUseCaseResponse } from "../../../domain/use-cases/user/login";
import { IJwtHelper } from "../../helpers/jwt-helper";
import { IUserRepository } from "../../protocols/user-repository";
import invalidCredentialsError from "../../../domain/errors/InvalidCredentialsError";
import InvalidCredentialsError from "../../../domain/errors/InvalidCredentialsError";
import { ICrypto } from "../../helpers/crypto";

export class LoginUseCase implements ILoginUseCase {
  constructor(private userRepo: IUserRepository, private jwtService: IJwtHelper, private crypto: ICrypto) {}
  async execute(data: loginUseCaseRequest): Promise<loginUseCaseResponse> {
    const user = await this.userRepo.findOneByEmail(data.email)
    if(user === undefined) {
      throw new invalidCredentialsError()
    }
    const passwordsMatch = await this.crypto.compare(data.password, user.password)
    if(!passwordsMatch) {
      throw  new InvalidCredentialsError()
    }
    const token = await this.jwtService.generateJwt(
      {
        name: user.name,
        id: user.id,
        email: user.email
      }
    )
    return ({
      userId: user.id,
      authToken: token
    })
  }

}