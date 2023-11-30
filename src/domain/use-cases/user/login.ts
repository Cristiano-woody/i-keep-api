export type loginUseCaseRequest = {
  login: string
  password: string
}
export type loginUseCaseResponse = {
  userId: string
  authToken: string
}

export interface ILoginUseCase {
  execute(data: loginUseCaseRequest): Promise<loginUseCaseResponse>
}