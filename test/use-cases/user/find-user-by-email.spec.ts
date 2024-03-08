import { describe, beforeEach, it, expect } from "vitest";
import { IFindUserByEmailUseCase } from "../../../src/domain/use-cases/user/find-user-by-email";
import { IUserRepository } from "../../../src/implementation/protocols/user-repository";
import { UserRepository } from "../../../src/infra/db/in-memory/user-repository";
import { FindUserByEmailUseCase } from "../../../src/implementation/use-cases/user/find-user-by-email";
import { User } from "../../../src/domain/entities/User";
import { UserNotFoundError } from "../../../src/domain/errors/user-not-found-error";

describe('Test for find user by email use case.', () => {
  let sut: IFindUserByEmailUseCase
  let userRepo: IUserRepository
  beforeEach(async () => {
    userRepo = new UserRepository()
    sut = new FindUserByEmailUseCase(userRepo)
    await userRepo.register(
      User.builder()
        .withId("333")
        .withName("aa")
        .withEmail("aa@sds.com")
        .withPassword("123")
        .withIsActive(true)
        .build()
    )
  });

  it('should be able to get user by email.', async () => {
    await expect(sut.execute("aa@sds.com")).resolves.not.toThrow()
  });

  it('should be able to get user by email.', async () => {
    const user = await sut.execute("aa@sds.com")
    expect(user).instanceof(User)
  });

  it('should be able to get user by email.', async () => {
    const user = await sut.execute("aa@sds.com")
    expect(user).haveOwnProperty("name")
    expect(user.name).toEqual("aa")
  });

  it('should not be able to get user with invalid email.', async () => {
    await expect(sut.execute("invalidEmail@invalid.com")).rejects.toThrow(new UserNotFoundError())
  });
});
