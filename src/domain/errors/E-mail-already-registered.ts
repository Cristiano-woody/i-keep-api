export class EmailAlreadyRegistered extends Error {
  constructor() {
    super("E-mail already registered.");
  }
}