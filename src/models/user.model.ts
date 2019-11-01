export interface UserModel {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    passwordHash?: string;
    salt?: string;
    userRole?: string;
  }
