import { describe, beforeEach, it, expect } from "vitest";
import { IFindUserByIdUseCase } from "../../../src/domain/use-cases/user/find-user-by-id";
import { IUserRepository } from "../../../src/implementation/protocols/user-repository";
import { UserRepository } from "../../../src/infra/db/in-memory/user-repository";
import { FindUserByIdUseCase } from "../../../src/implementation/use-cases/user/find-user-by-id";
import { User } from "../../../src/domain/entities/User";
import { UserNotFoundError } from "../../../src/domain/errors/user-not-found-error";

describe('Test for find user by id use case.', () => {
  let sut: IFindUserByIdUseCase
  let userRepo: IUserRepository
  beforeEach(async () => {
    userRepo = new UserRepository()
    sut = new FindUserByIdUseCase(userRepo)
    await userRepo.register(new User({id: "333", name: "aa", email: "aa@sds.com", password: "123", isActive: true}))
  });

  it('should be able get user by id and not throw error.', async () => {
    await expect(sut.execute("333")).resolves.not.toThrow()
  });

  it('should be able get user by id.', async () => {
    const user = await sut.execute("333")
    expect(user).ownProperty('email')
  });

  it('should be able get user by id', async () => {
    const user = await sut.execute("333")
    expect(user).instanceof(User)
  });

  it('should not be able get user with invalid id.', async () => {
    await expect(sut.execute("invalid id")).rejects.toThrow(new UserNotFoundError())
  });
});
