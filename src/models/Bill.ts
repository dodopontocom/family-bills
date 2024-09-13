import mongoose, { Document, Schema } from 'mongoose';

// Interface para definir o formato da conta
export interface IBill extends Document {
  name: string;
  description: string;
  type: string;
  dueDate: Date;
  alert: boolean;
  status: 'paid' | 'unpaid' | 'overdue';
}

// Definição do esquema para a "Bill" (conta)
const BillSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  dueDate: { type: Date, required: true },
  alert: { type: Boolean, default: false },
  status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' }
});

// Criar o modelo a partir do esquema
const Bill = mongoose.model<IBill>('Bill', BillSchema);

export default Bill;

