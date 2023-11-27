export type createNoteUseCaseRequest = {
  title: string
  description: string
  userId: string
}

export type createNoteUseCaseResponse = {
  title: string
  description: string
  id: string
}

export interface CreateNoteUseCase {
  execute(data: createNoteUseCaseRequest): Promise<createNoteUseCaseResponse>
}