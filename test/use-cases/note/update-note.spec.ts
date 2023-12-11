import { describe, beforeEach, it, expect } from "vitest";
import { IUpdateNoteUseCase } from "../../../src/domain/use-cases/note/update-note";
import { INoteRepository } from "../../../src/implementation/protocols/note-repository";
import { NoteRepository } from "../../../src/infra/db/in-memory/note-repository";
import { UpdateNoteUseCase } from "../../../src/implementation/use-cases/note/update-note";
import { Note } from "../../../src/domain/entities/Note";
import { NoteNotFoundError } from "../../../src/domain/errors/note-not-found-error";

describe('Test for update note use case.', () => {
  let sut: IUpdateNoteUseCase
  let noteRepo: INoteRepository
  beforeEach(async () => {
    noteRepo = new NoteRepository()
    sut = new UpdateNoteUseCase(noteRepo)
    await noteRepo.create(new Note({title: "title", description: "description", user_id: "123", id: "1234"}))
  });

  it('should be able to update note.', async () => {
    const modifiedNote = {title: " modified title", description: " modified description"}

    await expect(sut.execute(modifiedNote, "1234")).resolves.not.toThrow()
  });

  it('should be able to update note and confer returned properties.', async () => {
    const modifiedNote = {title: " modified title", description: " modified description"}
    const result = await sut.execute(modifiedNote, "1234")
    expect(result.description).toEqual(modifiedNote.description)
    expect(result.title).toEqual(modifiedNote.title)
  });

  it('must be able to update notes and check properties by searching the repository.', async () => {
    const modifiedNote = {title: " modified title", description: " modified description"}

    await sut.execute(modifiedNote, "1234")

    const searchNoteModified = await noteRepo.findOneById("1234")

    expect(searchNoteModified.title).toEqual(modifiedNote.title)
    expect(searchNoteModified.description).toEqual(modifiedNote.description)
  });

  it('should not be able to update note with invalid note id', async () => {
    const modifiedNote = {title: " modified title", description: " modified description"}

    await expect(sut.execute(modifiedNote, "invalidNoteId")).rejects.toThrow(new NoteNotFoundError())
  });
});
