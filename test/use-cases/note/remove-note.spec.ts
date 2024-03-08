import { describe, beforeEach, it, expect } from "vitest";
import { IRemoveNoteUseCase } from "../../../src/domain/use-cases/note/remove-note";
import { INoteRepository } from "../../../src/implementation/protocols/note-repository";
import { RemoveNoteUseCase } from "../../../src/implementation/use-cases/note/remove-note";
import { NoteRepository } from "../../../src/infra/db/in-memory/note-repository";
import { Note } from "../../../src/domain/entities/Note";
import { NoteNotFoundError } from "../../../src/domain/errors/note-not-found-error";

describe('', () => {
  let sut: IRemoveNoteUseCase
  let repo: INoteRepository
  beforeEach(async () => {
    repo = new NoteRepository()
    sut = new RemoveNoteUseCase(repo)
    await repo.create(
      Note.builder()
      .withId("1234")
      .withTitle("title")
      .withDescription("description")
      .withUserId("123")
      .build()
    )
  });

  it('should be able to remove note', async () => {
    await expect(sut.execute("1234")).resolves.not.toThrow()
  });
  it('it should not be possible to remove the non-existent note', async () => {
    await expect(sut.execute("000")).rejects.toThrow(new NoteNotFoundError())
  })
});
