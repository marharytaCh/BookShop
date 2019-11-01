export class CreateUserModel {
  firstName: string;
  lastName: string;
  username: string;
  passwordHash: string;
  salt: string;
  userRole: string;
}
