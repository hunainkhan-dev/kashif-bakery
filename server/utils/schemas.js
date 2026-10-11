import { z } from 'zod';
import { CATEGORIES } from '../models/Product.js';
import { ORDER_STATUSES } from '../models/Order.js';

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6).max(128),
});

export const productSchema = z.object({
  name: z.string().min(1).max(120),
  category: z.enum(CATEGORIES),
  price: z.coerce.number().min(0),
  desc: z.string().max(300).optional().default(''),
  image: z.string().url().or(z.literal('')).optional().default(''),
  inStock: z.coerce.boolean().optional().default(true),
});

export const productUpdateSchema = productSchema.partial();

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().optional(),
        name: z.string().min(1),
        qty: z.coerce.number().int().min(1),
        price: z.coerce.number().min(0),
      })
    )
    .min(1, 'Order must contain at least one item'),
  customer: z.object({
    name: z.string().min(2).max(80),
    phone: z.string().min(7).max(20),
    address: z.string().min(5).max(300),
  }),
  paymentMethod: z.enum(['cod', 'whatsapp', 'stripe']).optional().default('cod'),
});

export const statusSchema = z.object({
  status: z.enum(ORDER_STATUSES),
});
