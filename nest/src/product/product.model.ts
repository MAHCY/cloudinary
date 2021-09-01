import * as mongoose from 'mongoose';

// Define object show look like for mongoose(mongoose will automatic generate a id)
export const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status:{ type:Number,required:true },
  imageObj: { type: String, required: false },
  imageURL: { type: String, required: false },
});

export interface Product extends mongoose.Document {
  id: string;
  productName: string;
  description: string;
  price: number;
  status:number;
  imageObj: string;
  imageURL: string;
}