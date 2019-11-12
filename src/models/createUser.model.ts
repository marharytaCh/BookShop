export class CreateUserModel {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordSalt: string;
  passwordHash: string;
  userRole: string;
}
