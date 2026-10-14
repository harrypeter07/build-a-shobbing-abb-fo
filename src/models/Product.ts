import mongoose, { Schema, Document } from 'mongoose';
import { Shoe } from '@/types/shoe';

export interface IProductDocument extends Omit<Shoe, 'id'>, Document {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShoeColorSchema = new Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  image: { type: String, required: true },
}, { _id: false });

const ShoeReviewSchema = new Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: String, required: true },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: true },
  fitRating: { type: String, enum: ['True to Size', 'Runs Small', 'Runs Large'], default: 'True to Size' },
  helpfulCount: { type: Number, default: 0 },
}, { _id: false });

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    gender: { type: String, required: true },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 0 },
    badge: { type: String },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    stock: { type: Number, default: 10 },
    releaseYear: { type: Number, default: 2026 },
    description: { type: String, required: true },
    technology: [{ type: String }],
    weight: { type: String },
    cushioning: { type: String, default: 'Responsive' },
    drop: { type: String, default: '10mm' },
    sizes: [{ type: Number }],
    colors: [ShoeColorSchema],
    images: [{ type: String }],
    reviews: [ShoeReviewSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: any) {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);
