import { IJwtHelper } from "../../src/implementation/helpers/jwt-helper";

export class JwtHelperMock implements IJwtHelper{

  generateJwt(payload: any): Promise<string> {
    return payload.stringify
  }
}