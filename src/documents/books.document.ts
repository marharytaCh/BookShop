import { Document, Schema } from 'mongoose';

export interface Book extends Document {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    status?: string;
    currency?: string;
    type?: string;
    author?: string;
    img?: string;
}

export const BookSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    status: String,
    currency: String,
    type: String,
    author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
    img: String,
});
