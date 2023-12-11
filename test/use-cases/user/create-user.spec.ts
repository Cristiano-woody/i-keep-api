import { describe, beforeEach, it, expect } from "vitest";
import { createUserRequest, ICreateUserUseCase } from "../../../src/domain/use-cases/user/create-user";
import { IUserRepository } from "../../../src/implementation/protocols/user-repository";
import { UserRepository } from "../../../src/infra/db/in-memory/user-repository";
import { CreateUserUseCase } from "../../../src/implementation/use-cases/user/create-user";
import { ICrypto } from "../../../src/implementation/helpers/crypto";
import { Crypto } from "../../../src/infra/helpers/crypto";
import { EmailAlreadyRegistered } from "../../../src/domain/errors/E-mail-already-registered";

describe('', () => {
  let sut: ICreateUserUseCase
  let userRepo: IUserRepository
  let crypto: ICrypto
  beforeEach(async () => {
    userRepo = new UserRepository()
    crypto = new Crypto()
    sut = new CreateUserUseCase(userRepo, crypto)
  });

  it('should be able create user', async () => {
    const newUser: createUserRequest = {
      name: "asd",
      email: "asd@fake.com",
      password: "asd"
    }
    await expect(sut.execute(newUser)).resolves.not.toThrow()
  });

  it('should not be able to create user with duplicated email.', async () => {
    const newUser: createUserRequest = {
      name: "asd",
      email: "aaa@fake.com",
      password: "asd"
    }
    await sut.execute(newUser)
    await expect(sut.execute(newUser)).rejects.toThrow(new EmailAlreadyRegistered())
  })
});
