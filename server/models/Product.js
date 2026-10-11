import mongoose from 'mongoose';

export const CATEGORIES = ['cakes', 'cupcakes', 'cookies', 'breads'];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, required: true, enum: CATEGORIES, index: true },
    price: { type: Number, required: true, min: 0 },
    desc: { type: String, default: '', maxlength: 300 },
    image: { type: String, default: '' },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
