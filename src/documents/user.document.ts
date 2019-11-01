import * as mongoose from 'mongoose';
import { AuthorSchema } from 'src/documents/authors.document';

export interface User extends mongoose.Document {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    passwordHash?: string;
    salt?: string;
    userRole?: string;
}

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  passwordHash: String,
  salt: String,
  userRole: String,
});
