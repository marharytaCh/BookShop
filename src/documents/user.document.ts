import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    passwordHash?: string;
    passwordSalt?: string;
    userRole?: string;
}

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  passwordHash: String,
  passwordSalt: String,
  userRole: String,
});
