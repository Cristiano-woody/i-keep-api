import { describe, beforeEach, it, expect } from "vitest";
import { createNoteUseCaseRequest, ICreateNoteUseCase } from "../../../src/domain/use-cases/note/create-note";
import { INoteRepository } from "../../../src/implementation/protocols/note-repository";
import { IUserRepository } from "../../../src/implementation/protocols/user-repository";
import { CreateNoteUseCase } from "../../../src/implementation/use-cases/note/create-note";
import { NoteRepository } from "../../../src/infra/db/in-memory/note-repository";
import { UserRepository } from "../../../src/infra/db/in-memory/user-repository";
import { User } from "../../../src/domain/entities/User";
import { UserNotFoundError } from "../../../src/domain/errors/user-not-found-error";

describe('Test for create note use case.', () => {
  let sut: ICreateNoteUseCase
  let noteRepo: INoteRepository
  let userRepo: IUserRepository
  beforeEach(async () => {
    noteRepo = new NoteRepository()
    userRepo = new UserRepository()
    sut = new CreateNoteUseCase(noteRepo, userRepo)
    await userRepo.register(new User({id: "333", name: "aa", email: "aa@sds.com", password: "123", isActive: true}))
  });

  it('should be able to create a new note', async () => {
    const newNote: createNoteUseCaseRequest = {
      title: "title",
      description: "description",
      userId: "333"
    }

    await expect(sut.execute(newNote)).resolves.not.toThrow()
  });

  it('should be able to create a new note and return note id', async () => {
    const newNote = await sut.execute({
      title: "title",
      description: "description",
      userId: "333"
    })

    expect(newNote).ownProperty("id")
  });


  it('should not be able to create a new note with invalid user id.', async () => {
    const newNote: createNoteUseCaseRequest = {
      title: "title",
      description: "description",
      userId: "invalidUserId"
    }

    await expect(sut.execute(newNote)).rejects.toThrow(new UserNotFoundError())
  });
});
