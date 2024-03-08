import { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  rut: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  products: string[];
  avatar: string;
  created_at: Date;
  updated_at: Date;
  active: boolean;
}

export const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  rut: { type: String, required: false },
  email: {
    type: String,
    required: false,
    unique: true,
    validate: {
      validator: function (v: string) {
        const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return re.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido`
    }
  },
  phone: { type: String, required: true },
  address: { type: String, required: false },
  type: {
    type: String,
    required: true,
    default: 'CUSTOMER',
    enum: ['SUPPLIER', 'CUSTOMER', 'BOTH']
  },
  products: [{ type: String, required: false }],
  avatar: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
})

