import * as mongoose from 'mongoose';

export interface AuthorDocument extends mongoose.Document {
    id?: string;
    name?: string;
}

export const AuthorSchema = new mongoose.Schema({
    name:  String,
});
