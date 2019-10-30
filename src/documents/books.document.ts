import * as mongoose from 'mongoose';
import { AuthorSchema } from 'src/documents/authors.document';

export interface Book extends mongoose.Document {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    status?: string;
    currency?: string;
    type?: string;
    author?: string;
}

export const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    status: String,
    currency: String,
    type: String,
    author: String, // [{type: mongoose.Schema.Types.ObjectId, ref: 'Author'}],
});
