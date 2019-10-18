import * as mongoose from 'mongoose';

export const UseSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
