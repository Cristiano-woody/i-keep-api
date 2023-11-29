export class UserNotFoundError extends Error {
  constructor() {
    super("user Not Found.")
  }
}