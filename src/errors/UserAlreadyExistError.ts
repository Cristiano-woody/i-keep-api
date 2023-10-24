class UserAlreadyExistError extends Error {
  constructor() {
    super('User Already Exist Error');
  }
}

export default UserAlreadyExistError;
