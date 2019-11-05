export class CreateUserModel {
  firstName: string;
  lastName: string;
  username: string;
  passwordSalt: string;
  passwordHash: string;
  userRole: string;
}
