import { ILoginUseCase, loginUseCaseRequest, loginUseCaseResponse } from "../../../domain/use-cases/user/login";
import { IJwtService } from "../../helpers/jwt-service";
import { IUserRepository } from "../../protocols/user-repository";
import invalidCredentialsError from "../../../domain/errors/InvalidCredentialsError";
import InvalidCredentialsError from "../../../domain/errors/InvalidCredentialsError";

export class LoginUseCase implements ILoginUseCase {
  constructor(private jwtService: IJwtService, private userRepo: IUserRepository) {}
  async execute(data: loginUseCaseRequest): Promise<loginUseCaseResponse> {
    const user = await this.userRepo.findOneByEmail(data.login)
    if(user === undefined) {
      throw new invalidCredentialsError()
    }
    if(user.password !== data.password) {
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