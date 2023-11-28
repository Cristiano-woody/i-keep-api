export interface IRemoveNoteUseCase {
  execute(noteId: string): Promise<void>
}