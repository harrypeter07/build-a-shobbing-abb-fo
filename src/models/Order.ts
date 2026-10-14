import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  shoeId: string;
  name: string;
  brand: string;
  price: number;
  size: number;
  colorName: string;
  colorHex: string;
  image: string;
  quantity: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: 'card' | 'apple_pay' | 'klarna' | 'crypto';
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
  createdAt: Date;
}

const OrderItemSchema = new Schema({
  shoeId: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: true },
  colorName: { type: String, required: true },
  colorHex: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'US' },
  },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'card' },
  status: { type: String, default: 'confirmed' },
  trackingNumber: { type: String, required: true },
  estimatedDelivery: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
