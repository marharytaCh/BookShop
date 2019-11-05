export interface UserModel {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    passwordHash?: string;
    passwordSalt?: string;
    userRole?: string;
  }
