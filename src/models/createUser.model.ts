import { ApiModelProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

export const CreateUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String,
          unique: true,
          required: true},
  password: {
            type: String,
            required: true},
});

export interface CreateUser extends mongoose.Document {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?; string;
}
