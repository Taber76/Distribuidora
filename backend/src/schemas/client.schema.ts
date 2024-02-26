import { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  rut: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  active: boolean;
}

export const ClientSchema = new Schema<IClient>({
  name: { type: String, required: false },
  rut: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: false,
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
  avatar: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
})

