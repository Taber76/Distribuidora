import { Schema, Document } from 'mongoose';
//import AutoIncrementFactory from 'mongoose-sequence';
//import MongoDB from '../config/mogodb';

//const AutoIncrement = AutoIncrementFactory(MongoDB.getInstance().getConnection());

interface IItem {
  item_id: string,
  price: number,
  quantity: number
}

export interface IOrder extends Document {
  // order_id: number;
  client_id: string;
  client_name: string;
  user_id: string;
  items: IItem[];
  discount: number;
  observation: string;
  status: string;
  invoice_number: string;
  created_at: Date;
  updated_at: Date;
  finished_at: Date;
  active: boolean;
}

export const OrderSchema = new Schema<IOrder>({
  // order_id: { type: Number },
  client_id: { type: String, required: false },
  client_name: { type: String, required: false },
  user_id: { type: String, required: true },
  items: [{
    item_id: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  discount: { type: Number, required: false },
  observation: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: ['DRAFT', 'PENDING', 'IN_PROGRESS', 'FINISHED', 'CANCELED', 'BILLED']
  },
  invoice_number: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  finished_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
})

