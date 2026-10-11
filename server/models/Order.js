import mongoose from 'mongoose';

export const ORDER_STATUSES = ['pending', 'baking', 'out-for-delivery', 'delivered'];

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      validate: [(v) => v.length > 0, 'Order must contain at least one item'],
    },
    total: { type: Number, required: true, min: 0 },
    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
    },
    status: { type: String, enum: ORDER_STATUSES, default: 'pending', index: true },
    paymentMethod: { type: String, enum: ['cod', 'whatsapp', 'stripe'], default: 'cod' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
