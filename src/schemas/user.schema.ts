import { Schema } 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export const UseSchema: mongoose.Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});
