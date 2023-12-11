import { describe, beforeEach, it, expect } from "vitest";
import { FindAllNotesUseCase } from "../../../src/implementation/use-cases/note/find-all-notes";
import { IFindAllNotesUseCase } from "../../../src/domain/use-cases/note/find-all-notes";
import { INoteRepository } from "../../../src/implementation/protocols/note-repository";
import { NoteRepository } from "../../../src/infra/db/in-memory/note-repository";

describe('test for find all notes use case.', () => {
  let sut: IFindAllNotesUseCase
  let repo: INoteRepository
  beforeEach(async () => {
    repo = new NoteRepository()
    sut = new FindAllNotesUseCase(repo)
  });

  it('should be able get all notes', async () => {
    await expect(sut.execute()).resolves.not.toThrow()
    expect(Array.isArray(await sut.execute())).toBe(true)
  });
});
