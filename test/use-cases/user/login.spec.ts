import { describe, beforeEach, it, expect } from "vitest";
import { ILoginUseCase } from "../../../src/domain/use-cases/user/login";
import { IUserRepository } from "../../../src/implementation/protocols/user-repository";
import { IJwtHelper } from "../../../src/implementation/helpers/jwt-helper";
import { ICrypto } from "../../../src/implementation/helpers/crypto";
import { UserRepository } from "../../../src/infra/db/in-memory/user-repository";
import { JwtHelperMock } from "../../mok-helpers/jwt-helper-mock";
import { CryptoMock } from "../../mok-helpers/crypto-mock";
import { LoginUseCase } from "../../../src/implementation/use-cases/user/login";
import { User } from "../../../src/domain/entities/User";
import InvalidCredentialsError from "../../../src/domain/errors/InvalidCredentialsError";

describe('Test for login use case.', () => {
  let sut: ILoginUseCase
  let userRepo: IUserRepository
  let jwtHelper: IJwtHelper
  let crypto: ICrypto
  beforeEach(async () => {
    userRepo = new UserRepository()
    jwtHelper = new JwtHelperMock()
    crypto = new CryptoMock()
    sut = new LoginUseCase(userRepo, jwtHelper, crypto)
    await userRepo.register(
      User.builder()
      .withId("123")
      .withName("aa")
      .withEmail("aa@sds.com")
      .withPassword(await crypto.hash("123"))
      .withIsActive(true)
      .build()
    )
  });

  it('should be able to login.', async () => {
    await expect(sut.execute({email: "aa@sds.com", password: "123"})).resolves.not.toThrow()
  });

  it('should be able to login and return auth token.', async () => {
    const loginResponse = await sut.execute({email: "aa@sds.com", password: "123"})
    expect(loginResponse).ownProperty("authToken")
  });

  it('should be able to login and return user id.', async () => {
    const loginResponse = await sut.execute({email: "aa@sds.com", password: "123"})
    expect(loginResponse).ownProperty("userId")
  });

  it('should not be able to login with invalid email.', async () => {
    await expect(sut.execute({email: "invalidEmail@invalid.com", password: "123"})).rejects.toThrow(new InvalidCredentialsError())
  });

  it('should not be able to login with invalid password.', async () => {
    await expect(sut.execute({email: "aa@sds.com", password: "invalidPassword"})).rejects.toThrow(new InvalidCredentialsError())
  });
});
