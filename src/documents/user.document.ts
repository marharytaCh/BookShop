import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    passwordHash?: string;
    passwordSalt?: string;
    userRole?: string;
    confirmEmail?: boolean;
    validCode?: string;
}

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  passwordHash: String,
  passwordSalt: String,
  userRole: String,
  confirmEmail: Boolean,
  validCode: String,
});
