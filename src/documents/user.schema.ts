import * as mongoose from 'mongoose';

export const UseSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});
