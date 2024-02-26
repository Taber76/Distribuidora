import { Schema, Document } from 'mongoose';


export interface IItem extends Document {
  description: string;
  purchase_price: number;
  sale_price: number;
  profit_margin: number;
  stock: number;
  supliers_id: string[];
  created_at: Date;
  updated_at: Date;
}

export const ItemSchema = new Schema<IItem>({
  description: { type: String, required: true },
  purchase_price: { type: Number, required: false },
  sale_price: { type: Number, required: false },
  profit_margin: { type: Number, required: false },
  stock: { type: Number, required: false },
  supliers_id: [{ type: String, required: false }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})