
export interface ILoginUseCase {
  execute(data: loginUseCaseRequest): Promise<loginUseCaseResponse>
}

export type loginUseCaseRequest = {
  email: string
  password: string
}
export type loginUseCaseResponse = {
  userId: string
  authToken: string
}