export interface RemoveNoteUseCase {
  execute(noteId: string): Promise<void>
}