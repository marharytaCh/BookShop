export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    passwordHash?: string;
    salt?: string;
    userRole?: string;
  }
