import { Schema, Document } from 'mongoose';


export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  clients: string[];
  role: string;
  avatar: string;
  secure_password: boolean;
  created_at: Date;
  updated_at: Date;
  active: boolean;
}

export const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: false },
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
  clients: [{ type: String, required: false }],
  role: {
    type: String,
    required: true,
    enum: ['SELER', 'ADMIN']
  },
  avatar: { type: String, required: false },
  secure_password: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
})

