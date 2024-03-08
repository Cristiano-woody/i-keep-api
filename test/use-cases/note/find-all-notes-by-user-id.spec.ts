import { describe, beforeEach, it, expect } from "vitest";
import { IFindAllNotesByUserIdUseCase } from "../../../src/domain/use-cases/note/find-all-notes-by-user-id";
import { INoteRepository } from "../../../src/implementation/protocols/note-repository";
import { IUserRepository } from "../../../src/implementation/protocols/user-repository";
import { FindAllNotesByUserIdUseCase } from "../../../src/implementation/use-cases/note/find-all-notes-by-user-id";
import { NoteRepository } from "../../../src/infra/db/in-memory/note-repository";
import { UserRepository } from "../../../src/infra/db/in-memory/user-repository";
import { User } from "../../../src/domain/entities/User";
import { Note } from "../../../src/domain/entities/Note"
import { UserNotFoundError } from "../../../src/domain/errors/user-not-found-error";

describe('Test for find all notes by user id use case', () => {
  let sut: IFindAllNotesByUserIdUseCase
  let noteRepo: INoteRepository
  let userRepo: IUserRepository
  beforeEach(async () => {
    noteRepo = new NoteRepository()
    userRepo = new UserRepository()
    sut = new FindAllNotesByUserIdUseCase(noteRepo, userRepo)
    await userRepo.register(
    User.builder()
    .withId("333")
    .withName("aa")
    .withEmail("aa@sds.com")
    .withPassword("123")
    .withIsActive(true)
    .build())
  });

  it('should be able find all notes by user id.', async () => {
    await expect(sut.execute("333")).resolves.not.toThrow()
  });

  it('should be able to find all notes by user ID and check if the return is an array.', async () => {
    const notes = await sut.execute("333")

    expect(Array.isArray(notes)).toBe(true)
  });

  it('should be able to find all previously created notes by user ID', async () => {
    await noteRepo.create(
      Note.builder()
      .withId("123")
      .withTitle("title")
      .withDescription("description")
      .withUserId("333")
      .build()
      )

    const notes = await sut.execute("333")

    expect(notes[0]).instanceof(Note)
  });

  it('should not be able find all notes with invalid user id.', async () => {
    await expect(sut.execute("invalidUserId")).rejects.toThrow(new UserNotFoundError())
  });
});
