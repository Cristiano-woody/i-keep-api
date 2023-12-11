import { describe, beforeEach, it, expect } from "vitest";
import { IFindAllUsersUseCase } from "../../../src/domain/use-cases/user/find-all-users";
import { IUserRepository } from "../../../src/implementation/protocols/user-repository";
import { UserRepository } from "../../../src/infra/db/in-memory/user-repository";
import { FindAllUsersUseCase } from "../../../src/implementation/use-cases/user/find-all-users";

describe('Test for find all users use case.', () => {
  let sut: IFindAllUsersUseCase
  let userRepo: IUserRepository
  beforeEach(async () => {
    userRepo = new UserRepository()
    sut = new FindAllUsersUseCase(userRepo)
  });

  it('should be able get all users.', async () => {
    expect(Array.isArray(await sut.execute())).toBe(true)
  });

  it('should be able get all users.', async () => {
    await expect(sut.execute()).resolves.not.toThrow()
  });
});
