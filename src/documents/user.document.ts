import * as mongoose from 'mongoose';
import { AuthorSchema } from 'src/documents/authors.document';

export interface User extends mongoose.Document {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    passwordHash?: string;
    salt?: string;
    role?: string;
}

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  passwordHash: String,
  salt: String,
  role: String,
});
