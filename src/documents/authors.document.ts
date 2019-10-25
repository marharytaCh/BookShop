import * as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
    name:  String,
});

export interface Author extends mongoose.Document {
    id?: string;
    name?: string;
}
