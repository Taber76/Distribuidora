import { Schema, Document } from 'mongoose';

interface IItem {
  item_id: string,
  price: number,
  quantity: number,
  recived_quantity: number
}

export interface IPurchase extends Document {
  supplier_id: string;
  items: IItem[];
  observation: string;
  status: string;
  invoices_number: string[];
  created_at: Date;
  updated_at: Date;
  finished_at: Date;
}

export const PurchaseSchema = new Schema<IPurchase>({
  supplier_id: { type: String, required: true },
  items: [{
    item_id: { type: String, required: true },
  }],
  observation: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'PARTIAL', 'FINISHED', 'CANCELED']
  },
  invoices_number: [{ type: String, required: false }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  finished_at: { type: Date, default: Date.now },
})